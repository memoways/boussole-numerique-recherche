import { Link } from "wouter";
import { MessageCircle, ExternalLink, Compass } from "lucide-react";

/**
 * Footer global — Boussole Numérique Culture
 * Présent sur toutes les pages via App.tsx
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

const NAV_COLUMNS = [
  {
    title: "Le projet",
    links: [
      { href: "/projet", label: "Description du projet" },
      { href: "/timeline", label: "Calendrier" },
      { href: "/experience", label: "L'expérience Boussole" },
      { href: "/methode", label: "Méthode & co-conception" },
    ],
  },
  {
    title: "Recherche",
    links: [
      { href: "/recherche", label: "État de l’art & constats" },
      { href: "/references", label: "Exemples inspirants" },
      { href: "/ressources", label: "Ressources documentaires" },
    ],
  },
  {
    title: "Engagement",
    links: [
      { href: "/partenaires", label: "Partenaires & pilotes" },
      { href: "/methode", label: "Données & gouvernance" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-gray-100"
      style={{ backgroundColor: "#f8f9fc" }}
    >
      {/* Bande supérieure */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Colonne identité */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity w-fit">
              <img
                src="/logo-memoways.png"
                alt="Memoways"
                className="h-8 w-auto"
              />
              <span className="font-bold text-sm" style={{ color: "#515792" }}>
                Memoways Research
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Un projet en co-conception pour préparer une Boussole numérique utile aux actrices et acteurs culturels.
            </p>
            {/* Bouton contact */}
            <a
              href="mailto:ulrich.fischer@memoways.com?subject=Boussole%20Num%C3%A9rique%20Culture"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ backgroundColor: '#515792', color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#E27227'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#515792'; }}
            >
              <MessageCircle className="h-4 w-4" />
              Contacter l’équipe
            </a>
          </div>

          {/* Colonnes navigation */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#515792" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bande inférieure */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {year} Memoways — Genève, Suisse. Projet de recherche en cours.
          </p>
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end">
            <a
              href="https://memoways.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: "#515792" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#E27227")}
              onMouseLeave={e => (e.currentTarget.style.color = "#515792")}
            >
              memoways.com
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-gray-300">·</span>
            <Link
              href="/methode"
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              Données & confidentialité
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href="/partenaires"
              className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
              style={{ color: "#E27227" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <Compass className="h-3 w-3" />
              Participer au projet
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
