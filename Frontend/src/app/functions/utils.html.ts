export function getElementById(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}
export function showContent(element: HTMLElement) {
  element.style.display = 'block';
}
export function hideContent(element: HTMLElement) {
  element.style.display = 'none';
}
export function fixWidth(elementToFixId: string, elementRefId: string, percentual: number = 100): void {
  const fixElement = document.getElementById(elementToFixId);
  const refElement = document.getElementById(elementRefId);
  const new_width = refElement!.offsetWidth;
  fixElement!.style.width = (new_width / 100) * percentual + 'px';
}
export function getWidth(elementId: string): number {
  return document.getElementById(elementId)!.offsetWidth;
}
