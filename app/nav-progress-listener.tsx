"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { start, stop } from "@/lib/features/navProgressSlice";

export function NavProgressListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Bỏ qua lần đầu render (mới vào trang)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Chỉ dispatch start() khi thực sự có route change
    dispatch(start());

    let raf1: number | null = null;
    let raf2: number | null = null;
    let fallbackTimer: number | null = null;

    const stopNavigation = () => {
      // Thêm delay nhỏ để đảm bảo animation layer hoàn thành
      setTimeout(() => {
        raf1 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(() => {
            dispatch(stop());
          });
        });
      }, 100);
    };

    stopNavigation();

    // Safety net in case rendering stalls
    fallbackTimer = window.setTimeout(() => {
      dispatch(stop());
    }, 5000);

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [pathname, searchParams, dispatch]);

  useEffect(() => {
    const handlePopState = () => {
      dispatch(start()); // Bật overlay khi Back/Forward
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch]);

  return null;
}
