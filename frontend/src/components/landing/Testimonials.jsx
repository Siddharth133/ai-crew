import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    quote: "AI-Crew has revolutionized how we handle content creation. The AI agents are incredibly intuitive and produce high-quality work consistently.",
    author: "Emily Chen",
    role: "Content Director, TechCorp",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote: "The data analysis capabilities are mind-blowing. We've reduced our reporting time by 80% while getting deeper insights than ever before.",
    author: "David Rodriguez",
    role: "Head of Analytics, DataFlow",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    quote: "As a research team, we've never been more productive. The AI research assistant understands complex topics and finds relevant papers instantly.",
    author: "Dr. Sarah Thompson",
    role: "Research Lead, Innovate Labs",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    quote: "The automation features have streamlined our entire workflow. It's like having a team of experts working 24/7.",
    author: "Michael Park",
    role: "CTO, StartupX",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    quote: "The customer support AI is exceptional. It handles complex queries with human-like understanding and always maintains a professional tone.",
    author: "Lisa Wong",
    role: "Customer Success Manager, ServicePro",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/5.jpg"
  }
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={`w-5 h-5 ${
          i <= rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    );
  }
  return <div className="flex gap-1">{stars}</div>;
};

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10
      ${direction === 'prev' ? 'left-4' : 'right-4'}
      w-12 h-12 rounded-full bg-white/10 backdrop-blur-md
      border border-white/10 flex items-center justify-center
      text-white/80 hover:text-white hover:bg-white/20
      transition-all duration-300 transform hover:scale-110
      focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
  >
    {direction === 'prev' ? (
      <FaChevronLeft className="w-5 h-5" />
    ) : (
      <FaChevronRight className="w-5 h-5" />
    )}
  </button>
);

const Testimonials = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    customPaging: (i) => (
      <div className="w-2 h-2 rounded-full bg-white/20 mt-8 transition-all duration-300" />
    ),
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl opacity-30" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            See how AI-Crew is transforming businesses across industries
          </p>
        </div>

        <div className="relative">
          {/* Glow effect container */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 blur-3xl opacity-30" />
          
          <Slider ref={sliderRef} {...settings} className="testimonials-slider">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="px-4">
                <div className="relative group">
                  {/* Card with glow effect */}
                  <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md
                    border border-white/10 transition-all duration-500
                    hover:bg-white/10 hover:border-white/20
                    before:absolute before:inset-0 before:rounded-2xl
                    before:bg-gradient-to-r before:from-purple-500/20 before:to-pink-500/20
                    before:opacity-0 group-hover:before:opacity-100 before:transition-opacity
                    before:duration-500 before:-z-10 before:blur-xl">
                    
                    {/* Quote icon */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full
                      bg-gradient-to-r from-purple-500 to-pink-500
                      flex items-center justify-center text-white shadow-lg">
                      <FaQuoteLeft className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <p className="text-purple-100 text-lg mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full border-2 border-white/20"
                        />
                        <div>
                          <h4 className="text-white font-semibold">
                            {testimonial.author}
                          </h4>
                          <p className="text-purple-300 text-sm">
                            {testimonial.role}
                          </p>
                          <div className="mt-1">
                            <StarRating rating={testimonial.rating} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '24/7', label: 'AI Support' },
            { value: '50+', label: 'AI Agents' }
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-purple-300 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
