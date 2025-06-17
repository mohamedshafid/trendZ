import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Percent,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  HeartOff,
} from "lucide-react";
import { productCategories } from "../lib";
import { RelatedProducts } from "../components";
import { useAppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";
import { useAddToCart, useRemoveFromCart } from "../hooks/useCart";

const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Product ${productId}  | TrendZ`;
  }, []);

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [related, setRelated] = useState([]);

  const {
    isInCart,
    isInFavorites,
    toggleFavoriteItem,
    setCartItems,
    cartItems,
  } = useAppContext();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: removeFromCart } = useRemoveFromCart();

  const inFavorites = isInFavorites(productId);

  const inCart = isInCart(productId);

  const handleCartToggle = () => {
    const cartItem = {
      productId: productId,
      quantity,
      size: selectedSize,
    };

    if (inCart) {
      removeFromCart({ productId });
      toast.success("Removed from cart");
    } else {
      addToCart(cartItem);
      toast.success("Added to cart");
    }
  };

  const handleFavoriteToggle = () => {
    toggleFavoriteItem({ ...product });

    toast.success(
      inFavorites ? "Removed from favorites" : "Added to favorites"
    );
  };

  useEffect(() => {
    const allProducts = productCategories.flatMap((cat) => cat.products);
    const found = allProducts.find((p) => p.id === productId);
    setProduct(found);

    if (found) {
      const category = productCategories.find((cat) =>
        cat.products.some((p) => p.id === found.id)
      );
      const relatedProducts = category.products
        .filter((p) => p.id !== found.id)
        .slice(0, 3);
      setRelated(relatedProducts);
    }
  }, [productId]);

  const incrementQty = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrementQty = () => setQuantity((q) => Math.max(q - 1, 1));

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-600 text-xl font-semibold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen px-4 py-10 bg-gradient-to-br from-white via-[#f3f4f6] to-white text-gray-800">
      <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all">
        {/* Image */}
        <div className="relative group overflow-hidden rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
          />

          {/* Offer Tag */}
          <div className="absolute top-4 left-4 bg-white/80 text-primary font-bold text-xs px-3 py-1 rounded-full shadow-md">
            <Percent className="inline w-3 h-3 mr-1" />
            {product.offer}
          </div>

          {/* Favorite Icon */}
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md hover:bg-primary-100 transition"
            aria-label="Toggle Favorite"
          >
            {inFavorites ? (
              <HeartOff className="text-primary-500 w-5 h-5" />
            ) : (
              <Heart className="text-primary-500 w-5 h-5" />
            )}
          </button>

          {/* Quantity Tracker */}
          <div className="absolute bottom-4 right-4 bg-white/90 text-gray-800 rounded-full px-3 py-1 shadow-md flex items-center gap-2 border border-white/40 backdrop-blur-sm">
            <button
              onClick={decrementQty}
              className="p-1 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold">{quantity}</span>
            <button
              onClick={incrementQty}
              className="p-1 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {product.place}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-semibold text-primary">
                ₹{product.price}
              </span>
              <span className="flex items-center gap-1 text-sm text-primary">
                <Star className="w-4 h-4" />
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>

            <p className="mt-6 text-gray-700 text-sm leading-relaxed">
              {product.description} <br />
              <br />
              This product is crafted with care using high-quality materials
              that ensure a premium feel and long-lasting comfort. Whether it's
              a casual outing or a special occasion, this piece brings out your
              best look effortlessly. Experience the blend of modern style and
              timeless class. Available in multiple sizes — make it yours today!
            </p>

            {/* Size */}
            <div className="mt-6">
              <label className="font-semibold text-sm">Select Size:</label>
              <div className="flex gap-3 mt-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 rounded-full border text-sm transition ${
                      selectedSize === size
                        ? "bg-primary text-white"
                        : "bg-white border-gray-300 text-gray-600 hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleCartToggle}
            className={`w-full py-3 ${
              inCart ? "bg-primary/50" : "bg-primary"
            } text-white font-semibold rounded-full shadow-md hover:brightness-110 transition flex justify-center items-center gap-2`}
          >
            <ShoppingCart className="w-5 h-5" />
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts related={related} />
    </div>
  );
};

export default ProductDetail;
