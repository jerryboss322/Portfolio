import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/#about', label: 'About' },
    { path: '/#work', label: 'Work' },
    { path: '/#systems', label: 'Systems' },
    { path: '/#skills', label: 'Skills' },
    { path: '/#contact', label: 'Contact' }
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      const section = path.substring(2);
      return location.hash === `#${section}`;
    }
    return false;
  };

  useEffect(() => {
    const handleHashScroll = () => {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [location.hash]);

  return (
    <header className="topbar fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/#about" className="brand text-lg font-bold">
            JBOSS
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`topbar-nav text-sm font-medium transition-colors hover:text-accent ${isActive(item.path) ? 'text-accent' : 'text-muted'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="icon-button w-8 h-8 text-lg flex items-center justify-center rounded-full border border-border text-text hover:border-accent hover:bg-surface-strong transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '☀︎' : '☾'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden icon-button w-8 h-8 flex items-center justify-center rounded-full border border-border text-text hover:border-accent transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-surface border-t border-border`}>
        <nav className="container mx-auto px-4 py-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-3 text-sm font-medium transition-colors hover:text-accent ${isActive(item.path) ? 'text-accent' : 'text-muted'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
