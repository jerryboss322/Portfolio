import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Code2,
  Copy,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Moon,
  Search,
  Sun,
  User,
} from 'lucide-react';
import { profile, projects } from '@/content/data';
import { useTheme } from '@/lib/theme';

export const OPEN_COMMAND_PALETTE_EVENT = 'jboss:open-command-palette';

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
}

interface CommandItem {
  id: string;
  group: 'Navigation' | 'Case Studies' | 'Quick Actions';
  label: string;
  hint?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    const onCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const items = useMemo<CommandItem[]>(() => {
    const closeAndGo = (path: string) => {
      setOpen(false);
      navigate(path);
    };

    return [
      {
        id: 'nav-home',
        group: 'Navigation',
        label: 'Go to Home',
        hint: '/',
        icon: <Home size={15} />,
        onSelect: () => closeAndGo('/'),
      },
      {
        id: 'nav-work',
        group: 'Navigation',
        label: 'Go to Selected Work',
        hint: '/work',
        icon: <FolderGit2 size={15} />,
        onSelect: () => closeAndGo('/work'),
      },
      {
        id: 'nav-services',
        group: 'Navigation',
        label: 'Go to Services & Scope',
        hint: '/services',
        icon: <Briefcase size={15} />,
        onSelect: () => closeAndGo('/services'),
      },
      {
        id: 'nav-about',
        group: 'Navigation',
        label: 'Go to About & Toolbox',
        hint: '/about',
        icon: <User size={15} />,
        onSelect: () => closeAndGo('/about'),
      },
      {
        id: 'nav-contact',
        group: 'Navigation',
        label: 'Start a Project / Contact',
        hint: '/contact',
        icon: <Mail size={15} />,
        onSelect: () => closeAndGo('/contact'),
      },
      ...projects.map((p, idx) => ({
        id: `project-${p.slug}`,
        group: 'Case Studies' as const,
        label: `${p.title} — ${p.subtitle}`,
        hint: `0${idx + 1} · ${p.year}`,
        icon: <Code2 size={15} />,
        onSelect: () => closeAndGo(`/work/${p.slug}`),
      })),
      {
        id: 'action-copy-email',
        group: 'Quick Actions',
        label: copiedEmail ? 'Copied email to clipboard!' : `Copy email (${profile.email})`,
        hint: 'Clipboard',
        icon: copiedEmail ? <Check size={15} className="text-accent" /> : <Copy size={15} />,
        onSelect: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopiedEmail(true);
          window.setTimeout(() => {
            setCopiedEmail(false);
            setOpen(false);
          }, 650);
        },
      },
      {
        id: 'action-theme',
        group: 'Quick Actions',
        label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`,
        hint: 'Theme',
        icon: theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />,
        onSelect: () => {
          toggle();
          setOpen(false);
        },
      },
      {
        id: 'action-github',
        group: 'Quick Actions',
        label: 'Open GitHub Profile',
        hint: 'github.com/Jboss112',
        icon: <ArrowUpRight size={15} />,
        onSelect: () => {
          window.open(profile.github, '_blank', 'noopener,noreferrer');
          setOpen(false);
        },
      },
      {
        id: 'action-whatsapp',
        group: 'Quick Actions',
        label: 'Message on WhatsApp',
        hint: 'Direct chat',
        icon: <FileText size={15} />,
        onSelect: () => {
          window.open(profile.whatsapp, '_blank', 'noopener,noreferrer');
          setOpen(false);
        },
      },
    ];
  }, [copiedEmail, navigate, theme, toggle]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        (item.hint && item.hint.toLowerCase().includes(q))
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex]?.onSelect();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 bg-ink-950/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="surface-inset relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-ink-850"
          >
            {/* Search bar */}
            <div className="flex items-center gap-3 border-b border-line-faint px-4 py-3.5">
              <Search size={16} className="shrink-0 text-accent" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to case study, page, or action…"
                className="w-full bg-transparent text-[14px] text-display placeholder:text-muted focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="hidden rounded border border-line bg-ink-800 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline-block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[360px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-10 text-center font-mono text-[12px] text-muted">
                  No matching commands for &ldquo;{query}&rdquo;
                </div>
              ) : (
                (['Navigation', 'Case Studies', 'Quick Actions'] as const).map((group) => {
                  const groupItems = filtered.filter((i) => i.group === group);
                  if (!groupItems.length) return null;
                  return (
                    <div key={group} className="mb-2 last:mb-0">
                      <div className="px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        {group}
                      </div>
                      {groupItems.map((item) => {
                        const globalIndex = filtered.indexOf(item);
                        const isSelected = globalIndex === activeIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            onClick={item.onSelect}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors ${
                              isSelected
                                ? 'bg-accent/12 text-display'
                                : 'text-body hover:bg-tint-2 hover:text-display'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 min-w-0">
                              <span className={isSelected ? 'text-accent' : 'text-muted'}>
                                {item.icon}
                              </span>
                              <span className="truncate font-medium">{item.label}</span>
                            </span>
                            {item.hint && (
                              <span className="shrink-0 font-mono text-[11px] text-muted">
                                {item.hint}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer status bar */}
            <div className="flex items-center justify-between border-t border-line-faint bg-ink-900/60 px-4 py-2 font-mono text-[11px] text-muted">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>JBOSS.DEV // SYSTEM INDEX</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
