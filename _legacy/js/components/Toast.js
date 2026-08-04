/**
 * Toast.js — toast notification rendering
 */

export function renderToast(state) {
  if (!state.toast) return '';
  return `<div class="toast ${state.toast.tone}">${state.toast.message}</div>`;
}