import React from "react";
import { User, UserRound, Baby, ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[600px] w-full mt-20 bg-hero bg-cover bg-center rounded-[2rem] overflow-hidden flex items-center justify-start px-6 md:px-20 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#060d26]/80 to-black/90 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-white space-y-6 text-center mx-auto flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold">
          <span>Redefine </span>
          <span className="font-medium text-white tracking-tight">
            Your <span className="text-white-500">Style</span>
          </span>
          <span className="block text-white-500 text-5xl md:text-6xl font-extrabold">
            with TrendZ
          </span>
        </h1>

        <p className="text-base md:text-xl text-gray-200 font-thin italic">
          Discover fashion for <span className="font-bold text-white">Men</span>
          , <span className="font-bold text-white">Women</span>, and{" "}
          <span className="font-bold text-white">Kids</span> — all in one
          stylish place.
        </p>

        {/* Category Icons */}
        <div className="flex space-x-6 text-white text-xl mx-auto">
          <div className="flex items-center space-x-2">
            <User className="text-white w-5 h-5" />
            <span className="text-sm md:text-base">Men</span>
          </div>
          <div className="flex items-center space-x-2">
            <UserRound className="text-white w-5 h-5" />
            <span className="text-sm md:text-base">Women</span>
          </div>
          <div className="flex items-center space-x-2">
            <Baby className="text-white w-5 h-5" />
            <span className="text-sm md:text-base">Kids</span>
          </div>
        </div>

        {/* Button with Icon and Hover */}
        <button className="flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-primary/50 hover:shadow-white-500/40">
          <ShoppingBag className="w-5 h-5" />
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
