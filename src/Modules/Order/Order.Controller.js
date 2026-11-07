import { CartModel } from "../../DB/Models/Cart.model.js"
import { OrderModel } from "../../DB/Models/order.model.js";
import { productModel } from "../../DB/Models/product.model.js";


import Stripe from 'stripe';
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);
const Create_Cash_Order=async(req,res,next)=>{
    try {
        /**
         * 1- get cart , to know what your order
         * 2- Calc Total Price
         * 3-Create Order
         * 4- increase sold , decrease quantity >> of Product
         * 5- Clear The Cart
         */

        //1- get cart
        const cart=await CartModel.findById({_id:req.params._id});

        //2- Calc Total Price
        const TotalOrderPrice=cart.PriceAfterDiscount?cart.PriceAfterDiscount:cart.TotalPrice;

        //3- create the order

        const Order=await OrderModel.create({
            user:req.body.user,
            cartItems:cart.cartItems,
            TotalOrderPrice,
            shippingAddress:req.body.shippingAddress
        })

        
        if(Order){
            let Options=cart.cartItems.map(item=>({
                updateOne:{
                    filter:{
                        _id:item.product
                    },
                    update:{
                        $inc:{Quantity:-item.Quantity,sold:item.Quantity}
                    }
                }
            }))

            await productModel.bulkWrite(Options);

            //5 >> clear The Cart
            await CartModel.findByIdAndDelete({
                _id:req.params._id
            })
        }
        
        res.status(201).json({message:"order Created Successfully",Order})
    } catch (error) {
        return next(error)
    }
}



const get_user_orders=async(req,res,next)=>{
    try {
        const Order=await OrderModel.findOne({
            user:req.params._id
        }).populate("cartItems.product");
        res.status(200).json({message:"order get sucessfully",Order})
    } catch (error) {
        return next(error)
    }
}


const get_All_orders=async(req,res,next)=>{
    try {
        const Orders=await OrderModel.find().populate("cartItems.product");
        res.status(200).json({message:"order get sucessfully",Orders})
    } catch (error) {
        return next(error)
    }
}


const Create_Checkout_Session=async(req,res,next)=>{
    try {
console.log("Request Body:", req.body);
console.log("User:", req.body.user);
console.log("Authenticated User:", req.user?._id);
console.log("Cart ID:", req.params._id);
            //1- get cart
        const cart=await CartModel.findById(req.params._id);
if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
}

if (!req.body.user) {
    return res.status(400).json({ message: "User ID is required" });
}
        //2- Calc Total Price
        const TotalOrderPrice=cart.PriceAfterDiscount?cart.PriceAfterDiscount:cart.TotalPrice;

            const stripe = getStripe();
        let session=await stripe.checkout.sessions.create({
            line_items:[
            {
                price_data:{
                    currency: "EGP",
                    unit_amount:TotalOrderPrice*100,
                    product_data:{
                        name:req.body.name
                    }
                },
                quantity:1
            }
            ],
            mode:"payment",
        success_url: "http://localhost:7000/payment/success",
        cancel_url: "http://localhost:7000/payment/cancel",
            customer_email:req.body.email,
            client_reference_id:cart._id.toString(),
            metadata:{
                city: req.body.shippingAddress?.city || "",
                street: req.body.shippingAddress?.street || "",
                phone: req.body.shippingAddress?.phone || "",
                userId:String(req.body.user)
            }
        })


        return res.json({
            message: "Checkout session created successfully",
            session
        })
    } catch (error) {
        return next(error)
    }
}


const Create_webhook=async(req,res,next)=>{
try {
    console.log("Webhook Signature:", Boolean(req.headers["stripe-signature"]));
     let event;
     const endpointSecret = process.env.Secret_EndPoint;
    if (!endpointSecret) {
  throw new Error("Stripe webhook secret is missing");
}
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    if (!signature) {
    return res.status(400).json({
        message: "Stripe signature is missing"
    });
}
    try {
      event = getStripe().webhooks.constructEvent(
        req.body,
        signature,
        process.env.Secret_EndPoint
      );

 
    } catch (err) {
      console.log(` Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log("Checkout completed",session.id);

      // order will  be created here
   await  Create_order(session)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
} catch (error) {
    return next(error)
}
}


async function Create_order(session,res){
        const cart=await CartModel.findById(session.client_reference_id);
        //3- create the order
        const existingOrder = await OrderModel.findOne({
            stripeSessionId: session.id
        });

        if (existingOrder) {
            return existingOrder;
        }
        const Order=await OrderModel.create({
            user:session.body.user,
            cartItems:cart.cartItems,
            TotalOrderPrice:session.amount_total/100,
            shippingAddress:session.metadata.shippingAddress,
            paymentMethod:"card",
            isPaid:true,
            stripeSessionId: session.id,
            paidAt:Date.now()
        })

       
        if(Order){
            let Options=cart.cartItems.map(item=>({
                updateOne:{
                    filter:{
                        _id:item.product
                    },
                    update:{
                        $inc:{Quantity:-item.Quantity,sold:item.Quantity}
                    }
                }
            }))

            await productModel.bulkWrite(Options);

            //5 >> clear The Cart
            await CartModel.findByIdAndDelete({
                _id:req.params._id
            })
        }
        
        res.status(201).json({message:"order Created Successfully",Order})
    }
export {
    Create_Cash_Order,
    get_user_orders,
    get_All_orders,
    Create_Checkout_Session,
    Create_webhook
}