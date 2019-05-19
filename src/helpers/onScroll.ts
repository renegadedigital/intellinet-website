export default (element: HTMLElement, callback: () => void) => {
  element.addEventListener("scroll", callback, { passive: true });
  return () => element.removeEventListener("scroll", callback, false);
}
