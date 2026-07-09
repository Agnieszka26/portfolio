type RevealCallback = () => void;

const observerCache = new Map<number, IntersectionObserver>();
const elementCallbacks = new WeakMap<Element, RevealCallback>();

function getObserver(threshold: number): IntersectionObserver {
  let observer = observerCache.get(threshold);

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const callback = elementCallbacks.get(entry.target);
          callback?.();
          observer?.unobserve(entry.target);
          elementCallbacks.delete(entry.target);
        }
      },
      { threshold },
    );
    observerCache.set(threshold, observer);
  }

  return observer;
}

export function observeReveal(
  element: Element,
  callback: RevealCallback,
  threshold = 0.3,
) {
  elementCallbacks.set(element, callback);
  getObserver(threshold).observe(element);
}

export function unobserveReveal(element: Element, threshold = 0.3) {
  elementCallbacks.delete(element);
  observerCache.get(threshold)?.unobserve(element);
}
