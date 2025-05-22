import React from "react";

const Navbar = () => {
  return (
    <header className="w-full py-4 px-4 md:px-12 flex items-center justify-between bg-transparent shadow-none sticky top-0 z-30">
      {/* Left: Logo */}
      <div className="text-2xl font-extrabold tracking-wide select-none">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          AI-Crew
        </span>
      </div>

      {/* Center: Nav Links in pill-shaped gradient */}
      <nav className="flex-1 flex justify-center">
        <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500/80 px-8 py-2 shadow-md flex gap-6 items-center">
          <a href="#about" className="text-white font-medium hover:text-purple-200 transition">About</a>
          <a href="#pricing" className="text-white font-medium hover:text-purple-200 transition">Pricing</a>
          <a href="#contact" className="text-white font-medium hover:text-purple-200 transition">Contact Us</a>
          <a href="#agents" className="text-white font-medium hover:text-purple-200 transition">Agents</a>
          <a href="#support" className="text-white font-medium hover:text-purple-200 transition">Support</a>
          <a href="#solutions" className="text-white font-medium hover:text-purple-200 transition">Solutions</a>
        </div>
      </nav>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-3">
        <button className="text-white font-medium hover:text-pink-400 transition">Login</button>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-purple-600 hover:to-pink-600 transition">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
