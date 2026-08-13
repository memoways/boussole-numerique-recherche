import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleHelp, Lightbulb, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

/**
 * Présentation partenaire — expérience éditoriale autonome.
 * Direction : un message essentiel par écran, progression bleu → cyan → vert → orange.
 */

const SLIDES = [
  {
    eyebrow: "Présentation partenaire",
    title: "Une Boussole pour mieux situer les pratiques numériques",
    text: "La Boussole Numérique Culture aide les actrices, acteurs et structures culturelles à faire le point, choisir des pistes utiles et avancer à leur rythme.",
    accent: "#515792",
    link: "/projet",
    linkLabel: "Lire la note d’intention",
    icon: CircleHelp,
  },
  {
    eyebrow: "Le point de départ",
    title: "Les besoins du terrain ne suivent pas tous le même chemin",
    text: "Les usages, les ressources et les enjeux numériques varient fortement. Une réponse utile commence par écouter les situations réelles plutôt que par prescrire un modèle unique.",
    accent: "#3a7fc1",
    link: "/recherche",
    linkLabel: "Consulter les enseignements de recherche",
    icon: Users,
  },
  {
    eyebrow: "L’outil proposé",
    title: "Un diagnostic court, puis des pistes adaptées",
    text: "Un questionnaire adaptatif ouvre une restitution visuelle et un dialogue guidé. L’objectif est de repérer les leviers concrets, les priorités et les appuis possibles.",
    accent: "#3aab8a",
    link: "/experience",
    linkLabel: "Voir l’expérience proposée",
    icon: Lightbulb,
  },
  {
    eyebrow: "Pour qui ?",
    title: "Pour les personnes et structures qui font vivre la culture",
    text: "La démarche s’adresse aux artistes, professionnelles et professionnels, lieux, associations, réseaux et institutions qui souhaitent avancer avec leurs publics et leurs membres.",
    accent: "#7ab648",
    link: "/partenaires",
    linkLabel: "Voir les formes de contribution",
    icon: Users,
  },
  {
    eyebrow: "Comment cela fonctionne ?",
    title: "Comprendre, situer, prioriser, agir",
    text: "La Boussole part des situations décrites, propose une lecture visuelle et ouvre des pistes d’action. Elle peut ensuite nourrir un accompagnement conversationnel adapté au contexte.",
    accent: "#E07428",
    link: "/experience",
    linkLabel: "Explorer les cinq dimensions",
    icon: CheckCircle2,
  },
  {
    eyebrow: "Un cadre partagé",
    title: "Une démarche gratuite, neutre et souveraine",
    text: "Le projet défend un service utile, sans mise en avant payante, avec une attention forte au consentement, à la lisibilité et à l’autonomie des participantes et participants.",
    accent: "#515792",
    link: "/methode",
    linkLabel: "Découvrir la méthode et les principes",
    icon: CheckCircle2,
  },
  {
    eyebrow: "Valeur partenaire",
    title: "Relier les besoins des membres à une réponse collective",
    text: "Les partenaires peuvent faire remonter les réalités de leurs communautés, tester les formulations et contribuer à une ressource qui enrichit leur mission de médiation et d’accompagnement.",
    accent: "#3a7fc1",
    link: "/partenaires#contribution",
    linkLabel: "Comprendre les apports possibles",
    icon: Users,
  },
  {
    eyebrow: "Co-construction",
    title: "Vos retours participent aux fondations de la Boussole",
    text: "Le questionnaire partenaire prépare un atelier avec les partenaires et les utilisateurs finaux. Il sert à clarifier les besoins, les priorités, les idées et les craintes avant le prototypage.",
    accent: "#3aab8a",
    link: "/methode",
    linkLabel: "Voir la démarche de co-conception",
    icon: Lightbulb,
  },
  {
    eyebrow: "Prochaine étape",
    title: "Partager vos idées, maintenant ou plus tard",
    text: "Si vous avez reçu une invitation, le questionnaire est accessible directement. Sinon, vous pouvez demander un lien personnel pour contribuer au moment qui vous convient.",
    accent: "#E07428",
    link: "/partenaires/questionnaire",
    linkLabel: "Partager mes idées et feedbacks",
    icon: CheckCircle2,
  },
] as const;

export default function PartnerPresentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = SLIDES[currentIndex];
  const Icon = slide.icon;
  const isLast = currentIndex === SLIDES.length - 1;

  return (
    <div className="bg-white px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/partenaires" className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[#515792]">
            <ArrowLeft className="h-4 w-4" /> Partenaires
          </Link>
          <span aria-live="polite">{currentIndex + 1} / {SLIDES.length}</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100" aria-label={`Progression : ${currentIndex + 1} sur ${SLIDES.length}`} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={SLIDES.length}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%`, backgroundColor: slide.accent }} />
        </div>

        <article className="mt-6 min-h-[430px] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white p-7 sm:min-h-[480px] sm:p-12">
          <div className="flex items-start justify-between gap-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: slide.accent }}>{slide.eyebrow}</p>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm sm:h-14 sm:w-14" style={{ backgroundColor: slide.accent }}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-14 max-w-3xl sm:mt-20">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">{slide.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{slide.text}</p>
            <Link href={slide.link} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: slide.accent }}>
              {slide.linkLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
          </Button>
          {isLast ? (
            <Button asChild style={{ backgroundColor: "#E07428", color: "#fff" }}>
              <Link href="/partenaires/questionnaire">Partager mes idées et feedbacks <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          ) : (
            <Button onClick={() => setCurrentIndex((index) => Math.min(SLIDES.length - 1, index + 1))} style={{ backgroundColor: slide.accent, color: "#fff" }}>
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
