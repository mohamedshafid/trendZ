import { Shirt, Tag, ShirtIcon, Flame } from "lucide-react";
import { p1, p2, p3 } from "../assets";

const popularItems = [
  {
    image: p1,
    title: "Men's Premium Wear",
    category: "Men",
    description:
      "Step into style with our top-tier men's wear. Designed for comfort, confidence, and a perfect fit every time.",
    icon: <Shirt className="text-primary w-5 h-5" />,
  },
  {
    image: p2,
    title: "Graceful Women's Collection",
    category: "Women",
    description:
      "Flowy, elegant, and bold - our women's collection brings the perfect mix of tradition and modern fashion.",
    icon: <Tag className="text-primary w-5 h-5" />,
  },
  {
    image: p3,
    title: "Trendy Tees for Everyone",
    category: "Unisex",
    description:
      "Soft, playful, and always in style. Discover t-shirts that match your vibe and make every moment comfy.",
    icon: <ShirtIcon className="text-primary w-5 h-5" />,
  },
];

const Popular = () => {
  return (
    <section className="px-6 md:px-16 mt-20">
      <h2 className="text-4xl font-thin md:text-5xl text-center text-gray-800 mb-14 flex items-center justify-center gap-3">
        <Flame className="text-primary w-8 h-8 animate-pulse" />
        Popular Picks{" "}
        <span className="font-bold underline italic ml-2">Just for You</span>
      </h2>

      <div className="space-y-16">
        {popularItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center bg-white/50 backdrop-blur-lg shadow-xl border border-white/30 rounded-3xl overflow-hidden transition duration-300 hover:shadow-2xl`}
          >
            {/* Image wrapper with gradient overlay */}
            <div className="relative w-full md:w-1/2 h-72 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-black/30 mix-blend-multiply transition duration-300" />
            </div>

            {/* Text Content */}
            <div className="p-6 md:p-10 md:w-1/2 space-y-4 text-gray-800">
              <div className="flex items-center gap-2 text-sm text-primary">
                {item.icon}
                <span className="uppercase font-medium tracking-tight">
                  {item.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary flex items-center gap-2">
                {item.icon}
                {item.title}
              </h3>
              <p className="text-gray-700 font-thin italic">
                {item.description}
              </p>
              <button className="mt-4 inline-block px-6 py-2 bg-primary text-white font-medium rounded-full shadow-md transition hover:brightness-110">
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
