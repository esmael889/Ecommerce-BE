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

            //1- get cart
        const cart=await CartModel.findById(req.params._id);

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
            client_reference_id:req.params._id,
            metadata:{
                city: req.body.shippingAddress?.city || "",
                street: req.body.shippingAddress?.street || "",
                phone: req.body.shippingAddress?.phone || ""
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




export {
    Create_Cash_Order,
    get_user_orders,
    get_All_orders,
    Create_Checkout_Session
}