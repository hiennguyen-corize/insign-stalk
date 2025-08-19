"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import colors from "nice-color-palettes";
import { useAppSelector } from "@/lib/hooks";

export function NavOverlay() {
  const { isLoading, isActive } = useAppSelector(
    (state: any) => state.navProgress
  );
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<any>(null);

  // Log Redux state để theo dõi
  console.log("🔴 Redux State:", { isLoading, isActive });

  useEffect(() => {
    if (isLoading) {
      console.log(
        "🎬 Starting continuous animation - layers sliding left to cover screen"
      );
      // Dừng timeline cũ nếu có
      if (tl.current) {
        tl.current.kill();
        console.log("🛑 Stopped previous timeline");
      }

      // Khi bắt đầu loading: tạo timeline liên tục hoàn chỉnh
      if (root.current) {
        const layers = gsap.utils.toArray<HTMLDivElement>(
          ".nav-overlay .layer"
        );
        if (layers.length === 0) return;

        // Fallback colors
        const fallbackColors = ["#ff6b6b", "#4ecdc4"];

        let palette;
        try {
          palette =
            colors[Math.floor(gsap.utils.random(0, colors.length, 1, true))];
          if (!palette || !Array.isArray(palette) || palette.length === 0) {
            palette = fallbackColors;
          }
        } catch (error) {
          palette = fallbackColors;
        }

        layers.forEach((el: HTMLDivElement, i: number) => {
          el.style.backgroundColor = palette[i % palette.length];
          el.style.border = `2px solid ${palette[i % palette.length]}`;
        });

        // Reset position về bên phải và skew ban đầu
        gsap.set(layers, { x: "100%" });
        gsap.set(layers[1], { skewX: 0 }); // Layer 1 bắt đầu từ trạng thái bình thường

        // Tạo timeline liên tục hoàn chỉnh: từ phải → che màn hình → qua trái
        const continuousTl = gsap
          .timeline({ paused: true, defaults: { ease: "power3.out" } })
          .to(layers[0], {
            x: "-100%", // Che full màn hình
            duration: 2.0,
            ease: "power3.out",
          })
          .to(
            layers[1],
            {
              x: "-100%",
              duration: 2.0,
              ease: "power3.out",
              skewX: -15,
            },
            "-=1.8"
          ) // Bắt đầu sớm hơn 1.8s để tạo stagger
          .to(layers[0], {
            x: "-200%", // Tiếp tục qua trái để nhường giữa cho content
            duration: 0.25,
            ease: "power2.out",
          })
          .to(
            layers[1],
            {
              x: "-200%",
              duration: 0.25,
              ease: "power2.out",
            },
            "-=0.5"
          ) // Bắt đầu sớm hơn 0.05s để đồng bộ
          .to(
            layers[1],
            {
              duration: 1,
              skewX: 0,
            },
            "-=1.25"
          ); // Bắt đầu sớm hơn 0.05s để đồng bộ

        // Chạy timeline
        continuousTl.play();
        console.log("✅ Continuous animation started - no gaps, no stuttering");

        // Lưu timeline để có thể dừng khi cần
        tl.current = continuousTl;
      }
    } else {
      console.log(
        "🎬 Animation continuing automatically - no new timeline needed"
      );
      // Không cần tạo timeline mới, animation sẽ tự động tiếp tục
      // Timeline đã được tạo từ trước và sẽ chạy đến cuối
    }
  }, [isLoading]);

  return (
    <>
      <div
        className="nav-overlay fixed inset-0 z-[999999] pointer-events-none"
        ref={root}
      >
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="layer absolute inset-0 w-full h-full"
            style={{ zIndex: 1000 + i }}
          />
        ))}
      </div>
    </>
  );
}
