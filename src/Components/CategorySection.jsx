import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { MdOutlinePets } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";
import { BeatLoader } from "react-spinners";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category icons mapping
  const categoryIcons = {
    Pets: (
      <svg className="w-12 mx-auto" fill="currentColor" viewBox="0 0 15 18">
        <MdOutlinePets />
      </svg>
    ),
    Accessories: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
    "Care Products": (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    Foods: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  };

  const categoryColors = {
    Pets: "from-purple-500 to-pink-500",
    Accessories: "from-blue-500 to-cyan-500",
    "Care Products": "from-green-500 to-emerald-500",
    Foods: "from-orange-500 to-red-500",
  };

  useEffect(() => {
    fetch("https://pawmart-server-weld-nu.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <BeatLoader color="#FE7F73" size={15} />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-[#FE7F73]/10 dark:bg-[#FE7F73]/20 text-[#FE7F73] rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
              Browse Categories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Shop by Category
            </h2>
            <div className="text-2xl md:text-3xl font-bold text-[#FE7F73] min-h-[40px]">
              <Typewriter
                words={["Accessories", "Care Products", "Foods", "Pets"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </div>
          </motion.div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No categories found.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Link to={`/category/${encodeURIComponent(category)}`}>
                  <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        categoryColors[category] || "from-gray-400 to-gray-600"
                      } opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    {/* Content */}
                    <div className="relative p-8 flex flex-col items-center text-center">
                      {/* Icon Container */}
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                          categoryColors[category] ||
                          "from-gray-400 to-gray-600"
                        } flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        {categoryIcons[category] || (
                          <svg
                            className="w-12 h-12"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                        )}
                      </div>

                      {/* Category Name */}
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-[#FE7F73] transition-colors duration-300">
                        {category}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Explore our {category.toLowerCase()} collection
                      </p>

                      {/* Arrow Icon */}
                      <div className="flex items-center gap-2 text-[#FE7F73] font-semibold group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm">View Products</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-100 dark:to-gray-900 opacity-50 rounded-bl-full"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
