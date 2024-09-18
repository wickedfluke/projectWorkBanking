import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export function getElementById(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}
export function showContent(element: HTMLElement) {
  element.style.display = 'block';
}
export function hydeContent(element: HTMLElement) {
  element.style.display = 'none';
}
