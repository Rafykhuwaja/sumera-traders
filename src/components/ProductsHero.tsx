"use client";
import { motion, easeOut } from "framer-motion";

const ProductsHero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const decorativeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <section className="relative h-[70vh] backdrop-blur-sm flex items-center justify-center overflow-hidden">


      {/* Main content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl"
      >
        {/* Decorative top element */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#e87b51] to-transparent"></div>
            <div className="w-3 h-3 bg-[#e87b51] rounded-full animate-pulse"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#e87b51] to-transparent"></div>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
        >
          <span className="bg-[#e87b51] bg-clip-text text-transparent">
            Explore Our
          </span>
          <br />
          <span className="text-gray-400">Products</span>
        </motion.h1>

        {/* Subtext paragraph */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-light"
        >
          Discover our carefully curated collection of premium products, crafted
          with attention to detail and designed to enhance your lifestyle. From
          innovative solutions to timeless classics, find exactly what you&apos;re
          looking for.
        </motion.p>

     
        {/* Bottom decorative element */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center mt-16"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-[#e87b51] rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="w-3 h-3 bg-[#e87b51] rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.4,
              }}
              className="w-2 h-2 bg-[#e87b51] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

     
    </section>
  );
};

export default ProductsHero;
