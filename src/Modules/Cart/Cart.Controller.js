import { CartModel } from "../../DB/Models/Cart.model.js";
import { CouponModel } from "../../DB/Models/Coupon.model.js";
import { productModel } from "../../DB/Models/product.model.js";

//Calc Total Price
function CalcTotalPrice(isCartExist) {
  let TotalPrice = 0;
  isCartExist.cartItems.forEach(
    (elm) => (TotalPrice += elm.price * elm.Quantity),
  );
  isCartExist.TotalPrice = TotalPrice;
}
const Add_To_Cart = async (req, res, next) => {
  try {
    // Check for product exist in our website or not exist
    const product = await productModel
      .findById(req.body.product)
      .select("price");
    if (!product) {
      return next(new Error("product not exist to add it"));
    }
    req.body.price = product.price;
    const { _id } = req.params;
    const isCartExist = await CartModel.findOne({
      user: _id,
    });
    if (!isCartExist) {
      const Cart = await CartModel.create({
        user: _id,
        cartItems: req.body,
      });
      CalcTotalPrice(Cart);
      await Cart.save();
      return res
        .status(201)
        .json({ message: "Cart Created Successfully", Cart });
    }

    // update Cart Quantity if same product exist
    let isProductExist = isCartExist.cartItems.find(
      (elm) => elm.product == req.body.product,
    );
    if (isProductExist) {
      isProductExist.Quantity += req.body.Quantity || 1;
    } else {
      isCartExist.cartItems.push(req.body);
    }

    CalcTotalPrice(isCartExist);

    if(isCartExist.Discount){
    isCartExist.PriceAfterDiscount=isCartExist.TotalPrice-(isCartExist.TotalPrice*isCartExist.Discount)/100
    }
    await isCartExist.save();

    return res
      .status(200)
      .json({ message: "Cart Updated Successfully", cart: isCartExist });
  } catch (error) {
    return next(error);
  }
};

const Remove_From_Cart = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const cart = await CartModel.findOneAndUpdate(
      { user: _id },
      {
        $pull: { cartItems: { _id: req.body._id } },
      },
      {
        new: true,
      },
    );
    if (!cart) {
      return next(new Error("Cart not found to delete item from it"));
    }
    CalcTotalPrice(cart);

        if(cart.Discount){
            cart.PriceAfterDiscount=cart.TotalPrice-(cart.TotalPrice*cart.Discount)/100
        }
    await cart.save();
    res
    .status(200)
    .json({ message: "Product Delete Successfully from Cart", cart });
} catch (error) {
    return next(error);
}
};


const applyCoupon=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        // Find The coupon To Apply it
        const coupon=await CouponModel.findOne({code:req.body.code,expires:{$gt:Date.now()}})
        if(!coupon){
            return next(new Error("coupon not-found to apply it"))
        }
        //after Find The Coupon , Find The cart of specific user and apply coupon on it
        const cart =await CartModel.findOne({user:_id});
        if(!cart){
            return next(new Error("cart may be not created or user Delete the account and have no cart yet !!"))
        }

        //Apply the coupon Nooow
        cart.PriceAfterDiscount=cart.TotalPrice-(cart.TotalPrice*coupon.discount)/100
        cart.Discount=coupon.discount;
        await cart.save();
        return res.status(200).json({message:"Coupon Applied Successfully on products inside the carts",cart})
    } catch (error) {
        return next(error)
    }
}


const updateQuantity=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const { Quantity, userId } = req.body;
        const product=await productModel.findById({_id}).select("price");
        if(!product){
            return next(new Error("product not-found to update its quantity"))
        }
        const isCartExist=await CartModel.findOne({user:userId});
        if(!isCartExist){
            return next(new Error("cart not exist "))
        }

        const item=isCartExist.cartItems.find(elm=>elm.product.toString()==_id);
        if(item){
            item.Quantity=req.body.Quantity;
        }
        CalcTotalPrice(isCartExist);
        if (isCartExist.Discount) {
    isCartExist.PriceAfterDiscount =
        isCartExist.TotalPrice -
        (isCartExist.TotalPrice * isCartExist.Discount) / 100;
} else {
    isCartExist.PriceAfterDiscount = isCartExist.TotalPrice;
}
        await isCartExist.save();
        res.status(200).json({message:"success",cart:isCartExist})
    } catch (error) {
        return next(error)
    }
}

const getUserCart=async(req,res,next)=>{
    try {
        const cart=await CartModel.findOne({user:req.params._id}).populate("cartItems.product");

        res.status(200).json({message:"cart items get successfully",cart})
    } catch (error) {
        return next(error)
    }
}
export {
    Add_To_Cart,
    Remove_From_Cart,
    applyCoupon,
    updateQuantity,
    getUserCart
};
