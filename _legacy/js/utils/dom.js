/**
 * dom.js — lightweight DOM helpers
 * Part of the JBOSS design system v2 architecture.
 */

export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Bind a handler to all elements matching a selector.
 * Returns the list of matched elements for chaining.
 */
export function bindAll(selector, event, handler, parent = document) {
  const elements = $$(selector, parent);
  elements.forEach((el) => el.addEventListener(event, (e) => handler(e, el)));
  return elements;
}