import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const RelatedProducts = ({ related }) => {
  const navigate = useNavigate();
  return (
    <>
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {related.map((item) => (
              <div
                key={item.id}
                className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.place}</p>
                  <div className="flex justify-between items-center text-primary text-sm">
                    <span>₹{item.price}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedProducts;
