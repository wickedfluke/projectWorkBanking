export function getElementById(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}
export function showContent(element: HTMLElement) {
  element.style.display = 'block';
}
export function hideContent(element: HTMLElement) {
  element.style.display = 'none';
}
