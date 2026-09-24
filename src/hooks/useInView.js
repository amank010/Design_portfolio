import { useEffect, useRef, useState } from "react";

// Returns [ref, inView]. inView is true while the element is within
// `rootMargin` of the viewport.
const useInView = (rootMargin = "0px") => {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
};

export default useInView;
