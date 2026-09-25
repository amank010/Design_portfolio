import { useEffect, useRef, useState } from "react";

// Returns [ref, inView]. inView is true while the element is within
// `rootMargin` of the viewport and more than `minRatio` of it is showing.
const useInView = (rootMargin = "0px", minRatio = 0) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > minRatio),
      { rootMargin, threshold: [0, minRatio] },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, minRatio]);

  return [ref, inView];
};

export default useInView;
