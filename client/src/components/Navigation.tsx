import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Compass } from "lucide-react";
import { Link, useLocation } from "wouter";

/**
 * Navigation — Boussole Numérique Culture
 * 7 entrées selon le PRD : Projet | Expérience | Méthode | Recherche | Partenaires | Gouvernance | Ressources
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

const NAV_ITEMS = [
  { href: "/projet", label: "Projet" },
  { href: "/experience", label: "Expérience" },
  { href: "/methode", label: "Méthode" },
  { href: "/recherche", label: "Recherche" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/gouvernance", label: "Gouvernance" },
  { href: "/ressources", label: "Ressources" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile à chaque changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => location === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Memoways */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <img
              src="/logo-memoways.png"
              alt="Memoways"
              className="h-8 sm:h-9 w-auto"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-bold text-sm" style={{ color: '#515792' }}>Boussole Numérique</span>
              <span className="text-xs text-gray-500 font-medium">Culture</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className={`text-xs xl:text-sm px-2 xl:px-3 transition-colors ${
                  isActive(item.href)
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-primary/8"
                }`}
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <Button
              size="sm"
              className="ml-3 text-xs xl:text-sm font-semibold"
              style={{ backgroundColor: '#E27227', borderColor: '#E27227' }}
              asChild
            >
              <Link href="/partenaires">Suivre le projet</Link>
            </Button>
          </div>

          {/* Tablet Navigation (md) — version compacte */}
          <div className="hidden md:flex lg:hidden items-center gap-0.5">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className={`text-xs px-2 transition-colors ${
                  isActive(item.href)
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-primary/8"
                }`}
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <Button
              size="sm"
              className="ml-2 text-xs font-semibold"
              style={{ backgroundColor: '#E27227', borderColor: '#E27227' }}
              asChild
            >
              <Link href="/partenaires">Suivre</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile / Tablet Menu déroulant */}
        {isMobileMenuOpen && (
          <div className="py-3 border-t border-gray-100 bg-white/98 backdrop-blur-md">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`justify-start text-sm transition-colors ${
                    isActive(item.href)
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-primary/8"
                  }`}
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-1">
                <Button
                  className="w-full font-semibold"
                  style={{ backgroundColor: '#E27227', borderColor: '#E27227' }}
                  asChild
                >
                  <Link href="/partenaires">
                    <Compass className="h-4 w-4 mr-2" />
                    Suivre le projet
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
