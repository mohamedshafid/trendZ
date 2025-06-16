import { useState } from "react";
import { productCategories, categories, categoryMap } from "../lib";
import { Tag, Star, MapPin, Percent } from "lucide-react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("ethnic_wear");

  const handleCategoryClick = (name) => {
    const key = categoryMap[name];
    setSelectedCategory(key);
  };

  const selectedData = productCategories.find(
    (cat) => cat.key === selectedCategory
  );

  return (
    <section className="px-6 md:px-16 py-16 mt-20 bg-[#f9f9f9] min-h-screen transition-colors duration-500">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-14 transition-all">
        Shop by{" "}
        <span className="font-bold italic underline text-primary">
          Category
        </span>
      </h2>

      {/* Category Selector */}
      <div className="bg-primary/10 p-8 rounded-xl shadow-inner mb-20 transition-all">
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat, index) => {
            const isSelected = categoryMap[cat.name] === selectedCategory;
            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat.name)}
                className={`cursor-pointer w-40 h-40 rounded-full overflow-hidden bg-white/20 backdrop-blur-md border border-white/30 shadow-xl relative group transition-transform duration-300 ease-in-out ${
                  isSelected
                    ? "scale-110 ring-4 ring-primary/60 shadow-primary/40"
                    : "hover:scale-105 hover:shadow-2xl"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-black/30 rounded-full opacity-80 group-hover:opacity-100 transition duration-300" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm font-semibold z-10 text-center px-2 transition-all duration-200">
                  {cat.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Section */}
      <div className="transition-all duration-500">
        <h3 className="text-3xl font-bold mb-3 text-center text-gray-800">
          {selectedData.title}
        </h3>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto transition-opacity duration-300">
          {selectedData.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {selectedData.products.map((product) => (
            <div
              key={product.id}
              className="bg-white/30 backdrop-blur-md rounded-xl shadow-xl border border-white/40 transition duration-300 hover:shadow-primary/40 hover:scale-[1.03] cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity" />
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-primary shadow">
                  <Percent className="inline h-3 w-3 mr-1" />
                  {product.offer}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-2 text-gray-800 transition-all duration-200">
                <h4 className="text-lg font-semibold flex items-center gap-1">
                  <Tag className="h-4 w-4 text-primary" />
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  {product.place}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="flex items-center text-primary text-sm font-medium">
                    <Star className="h-4 w-4 mr-1" />
                    {parseFloat(product.rating).toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {product.reviews} reviews
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
