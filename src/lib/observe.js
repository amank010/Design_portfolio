// One IntersectionObserver per option set, shared by every element that uses
// the same options, instead of one observer per element. An element can have
// several callbacks on the same observer.
const observers = new Map();

export const observe = (element, callback, { rootMargin = "0px", threshold = 0 } = {}) => {
  if (!element) return () => {};

  const key = `${rootMargin}|${JSON.stringify(threshold)}`;
  let shared = observers.get(key);
  if (!shared) {
    const callbacks = new Map();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => callbacks.get(entry.target)?.forEach((fn) => fn(entry))),
      { rootMargin, threshold },
    );
    shared = { observer, callbacks };
    observers.set(key, shared);
  }

  let forElement = shared.callbacks.get(element);
  if (!forElement) {
    forElement = new Set();
    shared.callbacks.set(element, forElement);
    shared.observer.observe(element);
  } else {
    // a late subscriber still needs the current state, which the observer
    // only reports on changes
    const records = shared.observer.takeRecords();
    records.forEach((entry) => shared.callbacks.get(entry.target)?.forEach((fn) => fn(entry)));
    shared.observer.unobserve(element);
    shared.observer.observe(element);
  }
  forElement.add(callback);

  return () => {
    forElement.delete(callback);
    if (forElement.size === 0 && shared.callbacks.get(element) === forElement) {
      shared.callbacks.delete(element);
      shared.observer.unobserve(element);
    }
  };
};
