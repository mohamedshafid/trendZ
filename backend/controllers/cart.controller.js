import { Cart } from "../models/cart.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity, size } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity, size }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        // Item already exists — update quantity
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].size = size;
      } else {
        cart.items.push({ productId, quantity, size });
      }
    }

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(200)
        .json({ success: true, cart: { userId, items: [] } });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, size } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "No Items Found" });
    }

    cart.items = cart.items.filter(
      (item) => !(item.productId === productId && item.size === size)
    );

    await cart.save();
    res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
