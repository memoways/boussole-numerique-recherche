import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Building2, TestTube, Heart, MessageSquare, ChevronRight, Compass, MessagesSquare } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /partenaires — Partenaires & premiers utilisateurs
 * CTA doux : mailto, pas de formulaire complexe
 * Direction visuelle : progression bleu → cyan → vert → orange, CTA orange #E07428.
 */

const SPECTRE_PARTENAIRES = [
  { couleur: "#515792", texte: "#ffffff" },
  { couleur: "#3a7fc1", texte: "#ffffff" },
  { couleur: "#3aab8a", texte: "#ffffff" },
  { couleur: "#7ab648", texte: "#ffffff" },
  { couleur: "#E07428", texte: "#ffffff" },
] as const;

const POURQUOI_PARTICIPER = [
  { titre: "Mettre les questions à l’épreuve", desc: "Votre expérience aide l’équipe de projet à préciser les questions et les formes de restitution à tester.", icon: Heart, couleur: "#515792" },
  { titre: "Tester avant la version publique", desc: "Les partenaires de co-conception pourront essayer les premières versions et signaler ce qui demande un ajustement.", icon: TestTube, couleur: "#3a7fc1" },
  { titre: "Contribuer à un bien commun", desc: "Le projet prévoit une Boussole gratuite et à code ouvert. Votre participation nourrit un outil collectif pour le secteur.", icon: Users, couleur: "#3aab8a" },
];

const QUI_PEUT_CONTRIBUER = [
  { titre: "Structures culturelles genevoises", desc: "Musées, galeries, compagnies, associations, bibliothèques, écoles de musique, centres culturels — toute structure active dans le secteur culturel.", icon: Building2, couleur: "#515792", couleurTexte: "#ffffff" },
  { titre: "Artistes et professionnels indépendants", desc: "Artistes, créateurs, médiateurs, gestionnaires culturels qui souhaitent tester l'outil et partager leur expérience.", icon: Users, couleur: "#3a7fc1", couleurTexte: "#ffffff" },
  { titre: "Institutions partenaires", desc: "Organisations qui soutiennent le secteur culturel et souhaitent contribuer à un outil d'intérêt public.", icon: Heart, couleur: "#3aab8a", couleurTexte: "#ffffff" },
];

const PARCOURS_PARTENAIRE = [
  { num: "01", titre: "Je découvre", desc: "Je consulte la présentation pour comprendre le projet et son état d’avancement.", ...SPECTRE_PARTENAIRES[0] },
  { num: "02", titre: "Je signale mon intérêt", desc: "J’envoie un message ou je demande une invitation personnelle au questionnaire partenaire.", ...SPECTRE_PARTENAIRES[1] },
  { num: "03", titre: "Je contribue", desc: "Je pourrai participer à un entretien, un atelier ou un test selon ma disponibilité.", ...SPECTRE_PARTENAIRES[2] },
  { num: "04", titre: "Je teste", desc: "Je testerai une version du prototype et je partagerai ce qui mérite d’être ajusté.", ...SPECTRE_PARTENAIRES[3] },
  { num: "05", titre: "Je suis les apprentissages", desc: "Je recevrai les éléments documentés issus de la co-conception et des premiers tests.", ...SPECTRE_PARTENAIRES[4] },
];

export default function Partenaires() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-8 sm:pb-10 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792', color: '#fff' }}>Partenaires</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Partenaires & premiers utilisateurs
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-5">
            La Boussole se construit avec les professionnels et les structures du secteur culturel. Votre participation aidera l’équipe de projet à tester les questions, les exemples et les usages à privilégier.
          </p>
          <div className="mb-5 flex max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 sm:gap-4 sm:px-4 sm:py-3.5">
            <a
              href="https://www.geneve.ch/demarches/subvention-projets-ponctuels-culturels-scientifiques"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 rounded-lg bg-slate-50 p-1.5 transition-colors hover:bg-slate-100"
              aria-label="Consulter la démarche de subvention de la Ville de Genève"
            >
              <img
                src="/ville-geneve-soutien.8334b29d.png"
                alt="Ville de Genève"
                className="h-11 w-11 object-contain sm:h-14 sm:w-14"
              />
            </a>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] sm:text-xs sm:tracking-widest" style={{ color: '#515792' }}>Avec le soutien de</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">Ville de Genève</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600 sm:mt-1 sm:text-sm">
                Ce projet bénéficie du soutien de la Ville de Genève dans le cadre de sa démarche de subvention pour projets ponctuels, culturels ou scientifiques.
              </p>
            </div>
          </div>
          <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
            <Link href="/partenaires/presentation" className="group rounded-xl border border-[#515792]/25 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#515792] hover:shadow-sm">
              <span className="flex items-center gap-2 font-semibold text-slate-950"><Compass className="h-4 w-4 text-[#515792]" /> Découvrir la Boussole <ArrowRight className="ml-auto h-4 w-4 text-[#515792] transition-transform group-hover:translate-x-0.5" /></span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600">Une présentation courte pour comprendre le projet et son utilité.</span>
            </Link>
            <Link href="/partenaires/questionnaire" className="group rounded-xl bg-[#E07428] p-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex items-center gap-2 font-semibold"><MessagesSquare className="h-4 w-4" /> Partager mes idées et feedbacks <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              <span className="mt-2 block text-sm leading-relaxed text-white/90">Pour co-construire la Boussole en phase avec nos besoins, objectifs et enjeux.</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi participer */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pourquoi participer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POURQUOI_PARTICIPER.map(({ titre, desc, icon: Icon, couleur }) => (
              <div key={titre} className="rounded-2xl p-6" style={{ backgroundColor: couleur + '10' }}>
                <Icon className="h-8 w-8 mb-4" style={{ color: couleur }} />
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qui peut contribuer */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Qui peut contribuer</h2>
          <div className="space-y-4">
            {QUI_PEUT_CONTRIBUER.map(({ titre, desc, icon: Icon, couleur, couleurTexte }) => (
              <div key={titre} className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: couleur }}>
                  <Icon className="h-5.5 w-5.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)]" strokeWidth={2.5} style={{ color: couleurTexte }} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{titre}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours partenaire */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">De la découverte à la contribution</h2>
          <p className="text-gray-500 mb-10">Un parcours progressif : chacun·e choisit sa forme de contribution et son niveau d’implication.</p>

          {/* Desktop */}
          <div className="hidden md:flex items-start gap-2">
            {PARCOURS_PARTENAIRE.map(({ num, titre, desc, couleur, texte }, i) => (
              <div key={num} className="flex items-start flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3" style={{ backgroundColor: couleur, color: texte }}>
                    {num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-center text-sm mb-1">{titre}</h3>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">{desc}</p>
                </div>
                {i < PARCOURS_PARTENAIRE.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-gray-300 mt-2.5 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {PARCOURS_PARTENAIRE.map(({ num, titre, desc, couleur, texte }) => (
              <div key={num} className="flex gap-4 items-start p-4 rounded-xl" style={{ backgroundColor: couleur + '10' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ backgroundColor: couleur, color: texte }}>
                  {num}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires confirmés */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#3a7fc1', color: '#fff' }}>Partenaires confirmés</Badge>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Structures et personnes engagées</h2>
          <p className="text-gray-500 mb-8 max-w-xl">
            Ces structures ont confirmé leur participation à la co-conception de la Boussole.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              { nom: "Fonction:Cinéma", contact: "Aude Vermeil", url: "https://www.fonction-cinema.ch/", ...SPECTRE_PARTENAIRES[0] },
              { nom: "Pôle de création numérique", contact: "Alexandre Iordachescu", url: "https://polnum.ch/", ...SPECTRE_PARTENAIRES[1] },
              { nom: "XN Swiss", contact: null, url: "https://www.xnswiss.ch/", ...SPECTRE_PARTENAIRES[2] },
              { nom: "Observatoire Romand de la Culture", contact: "Olivier Glassey", url: "https://www.observatoire-culture.ch/", ...SPECTRE_PARTENAIRES[4] },
            ].map(({ nom, contact, url, couleur, texte }) => (
              <a
                key={nom}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ backgroundColor: couleur, color: texte }}>
                  {nom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold transition-colors" style={{ color: couleur }}>{nom}</p>
                  {contact && <p className="text-xs text-gray-500">{contact}</p>}
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1 transition-colors" style={{ color: couleur }} />
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-400 italic">D'autres partenaires rejoindront le projet au fil de la phase de co-conception.</p>
        </div>
      </section>

      {/* Ce que les partenaires recevront */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Ce que les partenaires apporteront</h2>
              <ul className="space-y-3">
                {[
                  "Leur expérience des pratiques numériques du quotidien",
                  "Leur regard critique sur les formulations et les questions",
                  "Leurs retours sur l'expérience utilisateur",
                  "Leurs besoins non formulés et leurs angles morts",
                  "Leur connaissance des conditions de travail du secteur",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: SPECTRE_PARTENAIRES[i].couleur }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Ce que le projet prévoit de partager</h2>
              <ul className="space-y-3">
                {[
                  "Accès en avant-première aux versions ouvertes aux partenaires",
                  "Synthèse des apprentissages de la co-conception",
                  "Documentation ouverte de la méthode",
                  "Invitations aux ateliers et sessions de retour selon les besoins du projet",
                  "Mention dans la documentation du projet, avec accord préalable",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: SPECTRE_PARTENAIRES[i].couleur }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comment le portail pourra évoluer */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #515792 0%, #3a7fc1 32%, #3aab8a 62%, #E07428 100%)' }}>
            <h2 className="text-2xl font-bold text-white mb-4">Comment le portail pourra évoluer</h2>
            <p className="text-white/80 leading-relaxed">Ce site compagnon pourra devenir, avec les partenaires et premiers utilisateurs, un espace de suivi de l’avancement, de partage des apprentissages, de documentation des retours et de préparation des premiers usages.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Participer à la co-conception</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Expliquez en quelques mots le lien de votre structure avec le projet. L’équipe de projet vous répondra avec les prochaines étapes et les modalités de participation.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" style={{ backgroundColor: '#E07428', color: '#fff' }} asChild>
              <a href="mailto:ulrich.fischer@memoways.com?subject=Boussole Numérique Culture — Je souhaite participer">
                <MessageSquare className="mr-2 h-4 w-4" />
                Demander à participer
              </a>
            </Button>
            <Button size="lg" variant="outline" style={{ borderColor: '#E07428', color: '#1f2937' }} asChild>
              <Link href="/timeline">Consulter les quatre phases <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Ou écrire directement à{" "}
            <a href="mailto:ulrich.fischer@memoways.com" className="underline hover:text-gray-600">ulrich.fischer@memoways.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
