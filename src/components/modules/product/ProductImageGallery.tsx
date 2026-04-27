"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const leftVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const ProductImageGallery = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <motion.div initial="hidden" animate="visible" variants={leftVariant}>
      {/* Main image */}
      <div
        className="bg-surface-3 rounded-3xl aspect-square flex items-center justify-center
                      border border-surface-3 hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
      >
        {images.length > 0 ? (
          <img
            src={images[activeThumb]}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[120px] select-none leading-none">📦</span>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 mt-3.5">
          {images.map((thumb, i) => (
            <button
              key={i}
              onClick={() => setActiveThumb(i)}
              className={`bg-surface-3 rounded-xl aspect-square flex items-center justify-center border-2 transition-all duration-150 overflow-hidden
                          ${
                            activeThumb === i
                              ? "border-accent bg-accent-light"
                              : "border-transparent hover:border-accent/40 hover:bg-accent-light/50"
                          }`}
              aria-label={`Thumbnail ${i + 1}`}
            >
              <Image
                width={50}
                src={thumb}
                alt={`${title} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
