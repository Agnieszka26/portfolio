type RevealCallback = () => void;

const observerCache = new Map<number, IntersectionObserver>();
const elementEntries = new WeakMap<
  Element,
  { observer: IntersectionObserver; callback: RevealCallback }
>();


function getObserver(threshold: number): IntersectionObserver {
  let observer = observerCache.get(threshold);

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const elementEntry = elementEntries.get(entry.target);
          elementEntry?.callback();
          observer?.unobserve(entry.target);
          elementEntries.delete(entry.target);
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
  const observer = getObserver(threshold);
  elementEntries.set(element, { observer, callback });
  observer.observe(element);
}

export function unobserveReveal(element: Element) {
  const entry = elementEntries.get(element);
  entry?.observer.unobserve(element);
  elementEntries.delete(element);
}
