
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">About Scottwells</h1>
        <p className="text-xl text-slate-600 leading-relaxed font-light">
          Scottwells is a value driven refurbished goods company built on one simple idea, smart people do not always buy new. For years, we have helped individuals, families, and small businesses access reliable items without paying premium prices.
        </p>
      </section>

      <div className="grid gap-12 md:gap-16">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What we do</h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            We specialize in sourcing quality second hand items and restoring them through careful inspection, testing, and refurbishment. Our products range from laptops, desktop computers, printers, and electronics to household items, furniture, and vehicles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why refurbished</h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            Many items built in the past were designed to last longer than some modern alternatives. By restoring and reselling these products, we help our customers save money while still enjoying dependable performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our promise</h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            Every item we sell is tested before it reaches our shelves. We focus on functionality, durability, and honest pricing. What you see is what you get.
          </p>
        </section>

        <section className="pt-8 border-t border-slate-100">
          <p className="text-2xl font-medium text-slate-900 italic">
            "At Scottwells, buying refurbished is not a compromise. It is a smarter way to spend."
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
