"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/preview-animations";
import type { Transition } from "framer-motion";

type GalleryLayout = "grid" | "masonry" | "alternating";

interface PhotoGalleryProps {
  photos: string[];
  nom: string;
  layout?: GalleryLayout;
  maxPhotos?: number;
  borderRadius?: number;
  transition?: Transition;
}

export function PhotoGallery({
  photos,
  nom,
  layout = "grid",
  maxPhotos = 4,
  borderRadius = 8,
  transition,
}: PhotoGalleryProps) {
  const visiblePhotos = photos.slice(0, maxPhotos);

  if (layout === "alternating") {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {visiblePhotos.map((photo, i) => {
          const isWide = i % 3 === 0;
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              transition={transition}
              style={{
                display: "grid",
                gridTemplateColumns: isWide ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              {isWide ? (
                <GalleryImage
                  src={photo}
                  alt={`${nom} — photo ${i + 1}`}
                  aspectRatio="16 / 7"
                  borderRadius={borderRadius}
                />
              ) : (
                <>
                  <GalleryImage
                    src={photo}
                    alt={`${nom} — photo ${i + 1}`}
                    aspectRatio="4 / 3"
                    borderRadius={borderRadius}
                  />
                  {visiblePhotos[i + 1] && (
                    <GalleryImage
                      src={visiblePhotos[i + 1]}
                      alt={`${nom} — photo ${i + 2}`}
                      aspectRatio="4 / 3"
                      borderRadius={borderRadius}
                    />
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  if (layout === "masonry") {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        style={{
          display: "grid",
          gridTemplateColumns: visiblePhotos.length === 1 ? "1fr" : "1fr 1fr",
          gap: 16,
        }}
      >
        {visiblePhotos.map((photo, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            transition={transition}
            style={{
              gridColumn: i === 0 ? "1 / -1" : undefined,
            }}
          >
            <GalleryImage
              src={photo}
              alt={`${nom} — photo ${i + 1}`}
              aspectRatio={i === 0 ? "16 / 7" : "4 / 3"}
              borderRadius={borderRadius}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Default grid
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
      }}
    >
      {visiblePhotos.map((photo, i) => (
        <motion.div key={i} variants={staggerItem} transition={transition}>
          <GalleryImage
            src={photo}
            alt={`${nom} — photo ${i + 1}`}
            aspectRatio="4 / 3"
            borderRadius={borderRadius}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function GalleryImage({
  src,
  alt,
  aspectRatio,
  borderRadius,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  borderRadius: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius,
        overflow: "hidden",
        aspectRatio,
        background: "#e5e5e5",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      />
    </div>
  );
}
