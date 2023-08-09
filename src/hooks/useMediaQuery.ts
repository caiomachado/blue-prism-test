import { useEffect, useState } from "react";

export const useMediaQuery = (maxWidth: number) => {
  const [sizeInfo, setSizeInfo] = useState({
    windowWidth: window.innerWidth,
    isDesiredWidth: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      const isDesiredWidth = currentWindowWidth < maxWidth;
      timer = setTimeout(() => {
        setSizeInfo({ windowWidth: currentWindowWidth, isDesiredWidth });
      }, 500)
    };
    
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler)
      clearTimeout(timer)
    }
  }, [sizeInfo.windowWidth, maxWidth]);

  return sizeInfo.isDesiredWidth
};