/* Applied before first paint, in <head>, so the correct palette is already on
   <html> when the document renders. Without this the page paints dark and then
   snaps to light a frame later — a white flash on every reload for anyone who
   chose light. Kept inline and tiny for that reason; it is not worth a request. */
(function () {
  try {
    var stored = localStorage.getItem('jboss-theme');
    var theme =
      stored ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
})();
