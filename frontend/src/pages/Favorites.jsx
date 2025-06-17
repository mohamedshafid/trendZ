import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { HeartOff, Sparkles } from "lucide-react"; // use any icon you prefer
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favoriteItems, toggleFavoriteItem } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 mt-15">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Sparkles className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-extrabold text-primary tracking-wide">
          Your Favorite Picks
        </h1>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center mt-24">
          <HeartOff className="mx-auto mb-4 w-14 h-14 text-primary animate-pulse" />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            No favorites added yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favoriteItems.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary/40"
              onClick={()=>navigate(`/product/${product.id}`)}
            >
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-52 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => toggleFavoriteItem(product)}
                  className="absolute top-3 right-3 p-2 bg-primary/90 hover:bg-primary text-white rounded-full shadow-md transition duration-300"
                >
                  <HeartOff className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 text-gray-800 dark:text-white">
                <h2 className="text-lg font-bold mb-1">{product.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {product.description?.slice(0, 60)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary text-lg font-semibold">
                    ₹{product.price}
                  </span>
                  <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
