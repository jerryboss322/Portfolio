import React from 'react';
import { ArrowRight, Cpu } from 'lucide-react';

interface SchematicNode {
  stage: string;
  name: string;
  detail: string;
}

interface SchematicSpec {
  protocol: string;
  invariant: string;
  nodes: [SchematicNode, SchematicNode, SchematicNode, SchematicNode];
}

const SCHEMATICS: Record<string, SchematicSpec> = {
  'virtual-football': {
    protocol: 'SSE · POISSON · DOUBLE-ENTRY LEDGER',
    invariant: 'Strict integer minor units & idempotent bet settlement before wallet mutation',
    nodes: [
      { stage: '01 // CLIENT', name: 'Next.js 15 + React 19', detail: 'Real-time pitch radar, CLOB exchange & betslip' },
      { stage: '02 // ENGINE', name: 'FastAPI + Python 3.12', detail: 'Autonomous match simulator & Poisson odds' },
      { stage: '03 // STREAM', name: 'SSE Broadcast Broker', detail: 'Sub-50ms live tick updates & event replay' },
      { stage: '04 // LEDGER', name: 'PostgreSQL 16 + AsyncPG', detail: 'ACID immutable transactions & bet escrow' },
    ],
  },
  titan: {
    protocol: 'HTTPS · JWT · WEBHOOK',
    invariant: 'Server-side price verification before Paystack charge',
    nodes: [
      { stage: '01 // CLIENT', name: 'React + Tailwind SPA', detail: 'Optimistic cart & product catalog' },
      { stage: '02 // API GATEWAY', name: 'Node.js + Express', detail: 'JWT auth & request validation' },
      { stage: '03 // DATA LAYER', name: 'Prisma + PostgreSQL', detail: 'ACID order & inventory ledger' },
      { stage: '04 // SETTLEMENT', name: 'Paystack + Cloudinary', detail: 'Signed webhooks & CDN media' },
    ],
  },
  jbet: {
    protocol: 'CLIENT-STATE · 60FPS · CANVAS',
    invariant: 'Deterministic combined-odds recalculation on every slip mutation',
    nodes: [
      { stage: '01 // VIEWPORT', name: 'Next.js 16 App Router', detail: 'Responsive sportsbook shell' },
      { stage: '02 // SLIP ENGINE', name: 'Typed Odds Reducer', detail: 'Multi-leg parlay & stake math' },
      { stage: '03 // MOTION', name: 'Framer Motion Layout', detail: 'Zero-jank odds & drawer transitions' },
      { stage: '04 // ARTIFACT', name: 'DOM-to-Canvas Ticket', detail: 'Downloadable PNG booking slip' },
    ],
  },
  sallygreen: {
    protocol: 'STATIC · ZERO-DEPS · 100 LH',
    invariant: 'Zero framework runtime — sub-second First Contentful Paint',
    nodes: [
      { stage: '01 // DOCUMENT', name: 'Semantic HTML5', detail: 'Editorial hierarchy & landmarks' },
      { stage: '02 // STYLING', name: 'Custom CSS Tokens', detail: 'Fluid clamp() type & grid' },
      { stage: '03 // CHOREOGRAPHY', name: 'IntersectionObserver', detail: 'Passive scroll-triggered reveals' },
      { stage: '04 // DELIVERY', name: 'Vercel Edge CDN', detail: 'Pre-compressed static assets' },
    ],
  },
  luxora: {
    protocol: 'WEBGL · R3F · ZUSTAND',
    invariant: 'Decoupled 60fps Three.js render loop from React cart state',
    nodes: [
      { stage: '01 // SCENE', name: 'Three.js + R3F', detail: 'Interactive 3D product inspection' },
      { stage: '02 // SHADERS/DRI', name: 'Drei + Lighting Rig', detail: 'PBR materials & orbit damping' },
      { stage: '03 // STORE', name: 'Zustand State', detail: 'Transient camera & cart sync' },
      { stage: '04 // OVERLAY', name: 'React 18 + Tailwind', detail: 'DOM HUD & checkout drawer' },
    ],
  },
  tastetrail: {
    protocol: 'SPA · LOCALSTORAGE · WHATSAPP URI',
    invariant: 'Zero-account checkout via structured WhatsApp order payload',
    nodes: [
      { stage: '01 // MENU UI', name: 'React 18 + Vite', detail: 'Instant category & dietary filter' },
      { stage: '02 // CART STATE', name: 'Context + Reducer', detail: 'Item modifiers & subtotal calc' },
      { stage: '03 // PERSISTENCE', name: 'LocalStorage Sync', detail: 'Survives page reload on mobile' },
      { stage: '04 // DISPATCH', name: 'WhatsApp Deep Link', detail: 'Pre-formatted kitchen receipt' },
    ],
  },
};

export const SystemSchematic: React.FC<{ slug: string }> = ({ slug }) => {
  const spec = SCHEMATICS[slug];
  if (!spec) return null;

  return (
    <div
      className="arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden my-8 surface-inset"
      aria-label="System architecture diagram"
    >
      {/* Top schematic bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-faint bg-ink-900/60 px-4 py-2.5 sm:px-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <div className="flex items-center gap-2">
          <Cpu size={13} className="text-accent" aria-hidden="true" />
          <span className="text-bright font-semibold">SYSTEM TOPOLOGY // {slug.toUpperCase()}</span>
        </div>
        <span>PROTOCOL: {spec.protocol}</span>
      </div>

      {/* 4-Stage Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-line-faint bg-ink-900/25">
        {spec.nodes.map((node, i) => (
          <div key={node.stage} className="relative p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-accent">
                  {node.stage}
                </span>
                {i < 3 && (
                  <ArrowRight
                    size={13}
                    className="hidden lg:inline text-line-strong"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="font-display text-[15px] font-bold text-display mb-1">
                {node.name}
              </div>
              <p className="text-[12px] leading-[1.55] text-muted">
                {node.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Invariant Bar */}
      <div className="border-t border-line-faint bg-ink-900/50 px-4 py-2.5 sm:px-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span className="text-muted">
          <strong className="text-accent font-semibold">KEY INVARIANT:</strong> {spec.invariant}
        </span>
        <span className="text-faint uppercase">FIG. ARCH-01</span>
      </div>
    </div>
  );
};
