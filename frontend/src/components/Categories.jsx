import React from "react";
import {
  ethnic,
  footwear,
  jeans,
  kids,
  menswear,
  westernwear,
  winterwear,
  tshirts,
} from "../assets";

const categories = [
  { name: "Men's Wear", image: menswear },
  { name: "Western Wear", image: westernwear },
  { name: "Kids", image: kids },
  { name: "Footwear", image: footwear },
  { name: "Winter", image: winterwear },
  { name: "T-Shirts", image: tshirts },
  { name: "Ethnic", image: ethnic },
  { name: "Jeans", image: jeans },
];

const Categories = () => {
  return (
    <section className="px-6 md:px-16 py-16 mt-20
    ">
      <h2 className="text-4xl md:text-5xl font-thin text-center text-gray-800 mb-14">
        Shop by{" "}
        <span className="font-bold italic underline text-primary">
          Category
        </span>
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 h-40 rounded-full overflow-hidden bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 relative group"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition duration-300"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-black/40 opacity-80 group-hover:opacity-100 transition duration-300 rounded-full" />

            {/* Text */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold tracking-wide text-center z-10">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
