import { useState, useEffect } from "react";

export const GetImages = (images: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const list = images;
    let mounted = true;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    const checkDone = () => {
      if (!mounted) return;
      loadedCount += 1;
      if (loadedCount >= list.length) setImagesLoaded(true);
    };

    list.forEach((src) => {
      const pre = new Image();
      pre.onload = () => checkDone();
      pre.onerror = () => checkDone();
      pre.src = src;
      imgs.push(pre);
    });

    return () => {
      mounted = false;
      imgs.forEach((i) => {
        i.onload = null;
        i.onerror = null;
      });
    };
  }, [images]);

  return imagesLoaded;
};
