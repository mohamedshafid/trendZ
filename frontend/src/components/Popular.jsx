import { Flame, Shirt, Tag, ShirtIcon } from "lucide-react";
import { p1, p2, p3 } from "../assets";

const popularItems = [
  {
    image: p1,
    title: "Men's Premium Wear",
    category: "Men",
    description:
      "Step into style with our top-tier men's wear. Designed for comfort, confidence, and a perfect fit every time.",
    icon: <Shirt className="w-6 h-6 text-white" />,
  },
  {
    image: p2,
    title: "Graceful Women's Collection",
    category: "Women",
    description:
      "Flowy, elegant, and bold - our women's collection brings the perfect mix of tradition and modern fashion.",
    icon: <Tag className="w-6 h-6 text-white" />,
  },
  {
    image: p3,
    title: "Trendy Tees for Everyone",
    category: "Unisex",
    description:
      "Soft, playful, and always in style. Discover t-shirts that match your vibe and make every moment comfy.",
    icon: <ShirtIcon className="w-6 h-6 text-white" />,
  },
];

const Popular = () => {
  return (
    <section id="popular" className="px-6 md:px-16 mt-20">
      <h2 className="text-4xl font-thin md:text-5xl text-center text-gray-800 mb-14 flex items-center justify-center gap-3">
        <Flame className="text-primary w-8 h-8 animate-pulse" />
        Popular Picks{" "}
        <span className="font-bold underline italic ml-2">Just for You</span>
      </h2>

      {/* New Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {popularItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1 group"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Floating Icon */}
            <div className="absolute top-4 left-4 bg-primary rounded-full p-2 shadow-lg">
              {item.icon}
            </div>

            {/* Text */}
            <div className="p-6 space-y-3 text-gray-800">
              <span className="text-sm uppercase text-primary font-semibold tracking-wide">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>

              <button className="mt-4 inline-block px-5 py-2 bg-primary text-white font-medium rounded-full shadow transition hover:brightness-110">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
