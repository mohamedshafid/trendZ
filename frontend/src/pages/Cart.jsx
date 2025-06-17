import { useAppContext } from "../contexts/AppContext";
import { useRemoveFromCart } from "../hooks/useCart";
import { useStripeCheckout } from "../hooks/useStripeCheckout";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { productCategories } from "../lib";
import { useNavigate } from "react-router-dom";

// 🔍 Helper to get full product details from productId
const getProductDetailsById = (id) => {
  for (const category of productCategories) {
    const product = category.products.find((p) => p.id === id);
    if (product) {
      return product;
    }
  }
  return null;
};

const Cart = () => {
  const { cartItems, user } = useAppContext();
  const removeMutation = useRemoveFromCart();
  const { mutate: startCheckout } = useStripeCheckout();

  const navigate = useNavigate();

  // Filter valid cart items with product details
  const productItems = cartItems
    .map((cartItem) => {
      const product = getProductDetailsById(cartItem.productId);
      return product ? { ...product, ...cartItem } : null;
    })
    .filter(Boolean);

  const getQty = (item) => item.quantity || 1;

  const itemTotal = productItems.reduce(
    (acc, item) => acc + item.price * getQty(item),
    0
  );
  const deliveryCost = itemTotal > 0 ? 50 : 0;
  const tax = itemTotal * 0.12;
  const grandTotal = itemTotal + deliveryCost + tax;

  const handleRemove = (productId) => {
    removeMutation.mutate(
      { productId },
      {
        onSuccess: () => toast.success("Item removed from cart"),
        onError: () => toast.error("Failed to remove item"),
      }
    );
  };

  const handleCheckout = () => {
    if (!user?.address) {
      navigate("/billing-info");
      return;
    }

    console.log("Starting checkout with items:", productItems);

    startCheckout(
      { cartItems: productItems },
      {
        onSuccess: (res) => {
          console.log("Checkout response:", res);
          if (res?.url) {
            window.location.href = res.url;
          } else {
            toast.error("Failed to initiate checkout: URL missing");
          }
        },
        onError: (error) => {
          console.error("Checkout error:", error);
          toast.error(
            error?.response?.data?.message || "Failed to start checkout"
          );
        },
      }
    );
  };
  

  return (
    <div className="min-h-screen p-6 relative">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        🛒 Your Cart
      </h1>

      {productItems.length === 0 ? (
        <div className="text-center mt-20">
          <Trash2 className="mx-auto w-16 h-16 text-primary animate-bounce mb-4" />
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-xl">
            <table className="min-w-[800px] w-full text-left text-white">
              <thead className="bg-primary/10 text-primary">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {productItems.map((item) => (
                  <tr
                    key={`${item.productId}-${item.size}`}
                    className="transition duration-300 hover:bg-white/10 border-t border-white/10"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary">
                      {item.name}
                      <div className="text-xs text-gray-400">
                        Size: {item.size}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-primary">₹{item.price}</td>
                    <td className="px-6 py-4 text-primary">{getQty(item)}</td>
                    <td className="px-6 py-4 text-primary font-semibold">
                      ₹{(item.price * getQty(item)).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* COST SUMMARY */}
          <div className="mt-8 flex justify-end">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 text-primary">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{itemTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (12%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <hr className="border-white/10 my-3" />
                <div className="flex justify-between text-lg font-semibold text-primary">
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-primary text-white font-semibold py-3 rounded-xl shadow-md hover:bg-primary/80 transition duration-300"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
