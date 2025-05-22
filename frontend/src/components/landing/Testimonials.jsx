import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Startup Founder',
    quote: 'AI-Crew made it effortless to automate my daily tasks. The agents are top-notch and saved me hours every week!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Content Creator',
    quote: 'The Plagiarism Rewriter Agent is a game changer. I can focus on creativity while AI handles the rest!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Michael Lee',
    role: 'Product Manager',
    quote: 'The Trip Planner Generator planned my vacation in minutes. I love how easy and intuitive everything is.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Sara Kim',
    role: 'Freelancer',
    quote: 'Resume Analyzer gave me instant, actionable feedback. I landed more interviews thanks to AI-Crew!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const slideInterval = useRef();

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(slideInterval.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const goTo = (i) => {
    if (i !== index) {
      stopAutoSlide();
      setIndex(i);
      startAutoSlide();
    }
  };

  return (
    <section className="relative py-24 w-full bg-gradient-to-b from-[#232946]/90 to-[#181C2A]/90 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-full h-[300px] bg-pink-500/20 rounded-full blur-3xl opacity-60" style={{ filter: 'blur(80px)' }}></div>
      </div>

      <div className="relative z-10 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Testimonials</span>
        </h2>

        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
              {testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="h-full flex items-center justify-center">
                    <div className="w-full p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-pink-500/20 shadow-xl min-w-[320px] max-w-4xl mx-auto text-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-purple-400 shadow-lg transition-transform duration-300 hover:scale-105"
                      />
                      <blockquote className="text-xl text-white font-medium mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                      <div className="text-purple-200 font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-purple-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-pink-500 scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
