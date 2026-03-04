import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const [location] = useLocation();
  const isHome = location === "/";

  const scrollOrNavigate = (id: string) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMobileMenuOpen(false);
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const navItems = [
    { type: "link", href: "/description-projet", label: "Boussole numérique culture" },
    { type: "scroll", id: "recherche-contexte", label: "Recherche & contexte" },
    { type: "scroll", id: "references-inspirantes", label: "Inspirations" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Memoways */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo-memoways.png" 
              alt="Memoways" 
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline font-bold text-lg" style={{ color: '#515792' }}>Memoways Research</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.type === "link" ? (
                <Button key={item.href} variant="ghost" className="text-sm hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                  <Link href={item.href!}>{item.label}</Link>
                </Button>
              ) : (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollOrNavigate(item.id!)}
                  className="text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {item.label}
                </Button>
              )
            ))}
            <Button
              variant="default"
              size="sm"
              className="ml-2"
              style={{ backgroundColor: '#E27227', borderColor: '#E27227' }}
              asChild
            >
              <a href="https://memoways.com/contact" target="_blank" rel="noopener noreferrer">
                Contact
              </a>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                item.type === "link" ? (
                  <Button key={item.href} variant="ghost" className="justify-start text-sm hover:bg-primary/10 hover:text-primary" asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </Button>
                ) : (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollOrNavigate(item.id!)}
                    className="justify-start text-sm hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </Button>
                )
              ))}
              <Button
                variant="default"
                size="sm"
                className="mt-2"
                style={{ backgroundColor: '#E27227', borderColor: '#E27227' }}
                asChild
              >
                <a href="https://memoways.com/contact" target="_blank" rel="noopener noreferrer">
                  Contact
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
