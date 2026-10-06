# Unused originals

Nothing in here is referenced by the site or by `scripts/build-images.mjs`,
which reads only the exact paths `assets/portrait.png` and
`assets/projects/<slug>.webp`. It is kept for reference.

| File | What it actually is |
|------|--------------------|
| `portrait.png` | A copy of the current `assets/portrait.png` — byte-identical, kept only so the source is recoverable if it gets overwritten. |
| `projects/*.png` | The project screenshots as PNG, 1348×652. The site serves the WebP derivatives in `public/img/projects/`, generated from the `.webp` files in `assets/projects/`. |
| `old-site-hero-3d-text-bug.png` | A screenshot of an earlier version of *this portfolio*, kept as a record of the 3D-extruded hero bug. Not a project screenshot. |

## Note on a past edit

The previous portrait was a 3D render with heavy self-shading that read as a
dark mass against the near-black page, so its shadow range was lifted in place
with `out = in + 40 * (1 - in/255) ** 2` plus a ×1.15 saturation restore, alpha
untouched. That edit died with the artwork when the portrait was replaced — the
current file is a different, already-bright render and needed no adjustment.

If a future portrait arrives dark and needs the same treatment, the caveat is
that a global lift also greys out genuinely dark *materials* (hair, dark
clothing). Past about L=50 the figure stops reading as solid and goes milky, so
re-rendering with even lighting is the better fix when the darkness is real.

To delete these without touching anything that builds, remove this directory.
