const Cart = require("../../models/Cart");

const addCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Data not valid"
      })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({
        userId,
        item: [{ productId, quantity }]
      })
    }
    else {
      const productIsExist = cart.item.findIndex(item => item.productId.toString() === productId)
      if (productIsExist > -1) {
        cart.item[productIsExist].quantity += quantity
      }
      else {
        cart.item.push({ productId, quantity })
      }
    }
    await cart.save()
    return res.status(200).json({
      success: true,
      message: "Add Cart successfully!",
      data: cart
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured at add Cart"
    })
  }
}


const fetchCart = async (req, res) => {
  try {
    const { userId } = req.params
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserID is not valid "
      })
    }
    const cart = await Cart.findOne({ userId }).populate('item.productId')

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart is not exists"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Get Cart successfully!",
      data: cart
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured at Fetch Cart"
    })
  }
}

const updateQTYCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    const cart = await Cart.findOne({ userId }).populate("item.productId")
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart is not exists"
      })
    }

    const findIndexProduct = cart.item.findIndex((id) => id.productId._id.toString() === productId)

    if (findIndexProduct === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    cart.item[findIndexProduct].quantity = quantity

    await cart.save()

    
    return res.status(200).json({
      success: true,
      message: "update Cart successfully!",
      data: cart
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error at updateQTY Cart",
    });
  }
}
const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title description category brand price salePrice totalStock createdAt updatedAt",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.item = cart.item.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "item.productId",
      select: "image title description category brand price salePrice totalStock createdAt updatedAt",
    });

    // const populateCartItems = cart.item.map((i) => ({
    //   productId: i.productId ? i.productId._id : null,
    //   image: i.productId ? i.productId.image : null,
    //   title: i.productId ? i.productId.title : "Product not found",
    //   price: i.productId ? i.productId.price : null,
    //   salePrice: i.productId ? i.productId.salePrice : null,
    //   quantity: i.quantity,
    // }));

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error at delete Cart",
    });
  }
};


module.exports = { addCart, fetchCart, deleteCart, updateQTYCart }