import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🆕 React Router
import ReactPaginate from "react-paginate";
import { Tag, Star, MapPin, Percent } from "lucide-react";
import Spinner from "./Spinner";
import "./Pagination.css";

const Products = ({
  selectedData,
  currentProducts,
  pageCount,
  handlePageClick,
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 🆕 For routing

  // Simulate loading when selectedData changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate delay
    return () => clearTimeout(timeout);
  }, [selectedData]);

  // Handle product click to navigate to detail page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Show spinner while loading
  if (loading) return <Spinner />;

  return (
    <section id="products" className="transition-all duration-500">
      <h3 className="text-3xl font-bold mb-3 text-center text-gray-800">
        {selectedData.title}
      </h3>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto transition-opacity duration-300">
        {selectedData.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="bg-white/30 backdrop-blur-md rounded-xl shadow-xl border border-white/40 transition duration-300 hover:shadow-primary/40 hover:scale-[1.03] cursor-pointer"
          >
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
              <p className="text-xs text-gray-500">{product.reviews} reviews</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          disabledClassName="opacity-50 cursor-not-allowed"
          previousClassName="page-button"
          nextClassName="page-button"
          pageClassName="page-button"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
        />
      </div>
    </section>
  );
};

export default Products;
