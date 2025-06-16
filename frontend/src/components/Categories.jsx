import { useState } from "react";
import { productCategories, categories, categoryMap } from "../lib";
import Products from "./Products";
// Create this for custom styles

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("ethnic_wear");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  const handleCategoryClick = (name) => {
    const key = categoryMap[name];
    setSelectedCategory(key);
    setCurrentPage(0);
  };

  const selectedData = productCategories.find(
    (cat) => cat.key === selectedCategory
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = selectedData.products.slice(
    offset,
    offset + productsPerPage
  );

  const pageCount = Math.ceil(selectedData.products.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section id="category" className="px-6 md:px-16 py-16 mt-20 bg-[#f9f9f9] min-h-screen transition-colors duration-500">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-14 transition-all">
        Shop by{" "}
        <span className="font-bold italic underline text-primary">
          Category
        </span>
      </h2>

      {/* Category Selector */}
      <div className="bg-primary/5 p-8 rounded-2xl shadow-inner mb-20 transition-all">
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

      {/* Products Section */}
      <Products
        selectedData={selectedData}
        currentProducts={currentProducts}
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Categories;
