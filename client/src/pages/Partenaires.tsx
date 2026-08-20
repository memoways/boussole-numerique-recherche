import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Building2, TestTube, Heart, MessageSquare, ChevronRight, Compass, MessagesSquare } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /partenaires — entrée d’engagement des organisations relais et contributeurs individuels.
 * CTA primaire : questionnaire partenaire ; parcours d’invitation conservé pour les personnes non invitées.
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
  { titre: "Réfléchir avec le terrain", desc: "Votre expérience aide à préciser les problèmes qui pèsent réellement sur les pratiques numériques et créatives.", icon: Heart, couleur: "#515792" },
  { titre: "Co-concevoir le prototype", desc: "Les partenaires mettent les questions, les exemples et les restitutions à l’épreuve avant toute version publique.", icon: TestTube, couleur: "#3a7fc1" },
  { titre: "Préparer les tests", desc: "Votre structure peut relier l’outil aux artistes, aux équipes et aux communautés qu’elle accompagne.", icon: Users, couleur: "#3aab8a" },
  { titre: "Devenir un relais", desc: "Les apprentissages serviront à préparer une diffusion utile, sans demander aux partenaires de porter seuls le dispositif.", icon: Building2, couleur: "#E07428" },
];

const QUI_PEUT_CONTRIBUER = [
  { titre: "Institutions, structures et associations culturelles", desc: "Vous représentez un lieu, une association, une fédération ou une structure qui organise, soutient ou accompagne des pratiques culturelles.", icon: Building2, couleur: "#515792", couleurTexte: "#ffffff" },
  { titre: "Réseaux et collectifs qui relient des artistes", desc: "Vous connaissez les besoins de membres, de communautés ou de publics et pouvez aider à les traduire dans la conception de l’outil.", icon: Users, couleur: "#3a7fc1", couleurTexte: "#ffffff" },
];

const PARCOURS_PARTENAIRE = [
  { num: "01", titre: "Je réponds", desc: "Je partage besoins, idées et situations à comprendre, ou je demande une invitation personnelle.", ...SPECTRE_PARTENAIRES[0] },
  { num: "02", titre: "Je co-conçois", desc: "Je participe à l’atelier et au cadrage prévus entre septembre et octobre 2026.", ...SPECTRE_PARTENAIRES[1] },
  { num: "03", titre: "Je teste", desc: "Je confronte le prototype visé fin 2026 aux pratiques que je connais.", ...SPECTRE_PARTENAIRES[2] },
  { num: "04", titre: "Je deviens relais", desc: "Je contribue aux ajustements avant l’ouverture publique visée début 2027.", ...SPECTRE_PARTENAIRES[3] },
];

export default function Partenaires() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-8 sm:pb-10 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792', color: '#fff' }}>Partenaires</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Co-concevoir une Boussole encore à construire
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-5">
            La Boussole n’existe pas encore. Ce site compagnon rassemble les retours des institutions, structures, associations, réseaux et collectifs qui peuvent aider à la co-concevoir avec les artistes. Votre contribution servira à cadrer puis développer un prototype utile et actionnable.
          </p>
          <div className="mb-5 grid max-w-2xl gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Aujourd’hui", "Informer et recueillir les retours"],
              ["Sept.–oct. 2026", "Atelier et cadrage"],
              ["Fin 2026", "Prototype à tester visé"],
              ["Début 2027", "Ouverture publique visée"],
            ].map(([moment, detail], index) => <div key={moment} className="border border-slate-200 bg-white px-3 py-3"><p className="text-[10px] font-bold uppercase tracking-[0.11em]" style={{ color: SPECTRE_PARTENAIRES[index].couleur }}>{moment}</p><p className="mt-1 text-xs font-semibold leading-snug text-slate-700">{detail}</p></div>)}
          </div>
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
                alt="Logo du soutien institutionnel"
                className="h-11 w-11 object-contain sm:h-14 sm:w-14"
              />
            </a>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] sm:text-xs sm:tracking-widest" style={{ color: '#515792' }}>Avec le soutien de</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">Ville de Genève</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600 sm:mt-1 sm:text-sm">
                Soutien obtenu dans le cadre d’une démarche de subvention pour projets ponctuels, culturels ou scientifiques.
              </p>
            </div>
          </div>
          <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
            <Link href="/partenaires/presentation" className="group rounded-xl border border-[#515792]/25 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#515792] hover:shadow-sm">
              <span className="flex items-center gap-2 font-semibold text-slate-950"><Compass className="h-4 w-4 text-[#515792]" /> Comprendre la co-conception <ArrowRight className="ml-auto h-4 w-4 text-[#515792] transition-transform group-hover:translate-x-0.5" /></span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600">Voir le problème, les rôles des partenaires et le prototype à décider avant son développement.</span>
            </Link>
            <Link href="/partenaires/questionnaire" className="group rounded-xl bg-[#E07428] p-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex items-center gap-2 font-semibold"><MessagesSquare className="h-4 w-4" /> Répondre au questionnaire partenaire <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              <span className="mt-2 block text-sm leading-relaxed text-white/90">Partager besoins, priorités, idées et points de vigilance avant l’atelier de co-conception.</span>
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500"><span className="font-semibold text-slate-700">Étape actuelle : informer et recueillir les retours.</span> Si vous n’avez pas encore reçu d’invitation, le parcours vous permet d’en demander une avant l’atelier et le cadrage de l’automne.</p>
        </div>
      </section>

      {/* Pourquoi participer */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Pourquoi votre rôle compte</h2>
          <p className="mb-8 max-w-2xl text-gray-600 leading-relaxed">Les partenaires font le lien entre les choix de conception et les situations que les artistes rencontrent. Leur rôle est de construire l’outil avant qu’il existe, puis de le confronter aux usages qui compteront réellement.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-3">À qui ce site s’adresse-t-il ?</h2>
          <p className="mb-8 max-w-2xl text-gray-600 leading-relaxed">La priorité va aux organisations qui peuvent porter la voix de communautés artistiques. Une contribution individuelle reste bienvenue lorsqu’elle apporte une expérience de terrain utile.</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Du questionnaire à l’ouverture publique : un parcours en quatre étapes</h2>
          <p className="text-gray-500 mb-10">Le site sert aujourd’hui à écouter et à préparer le travail collectif. L’atelier et le cadrage précèdent le prototype à tester, puis les ajustements avant une ouverture publique visée début 2027.</p>

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
            <h2 className="text-2xl font-bold text-white mb-4">Un site compagnon qui évolue avec l’outil</h2>
            <p className="text-white/80 leading-relaxed">Après la mobilisation et le questionnaire, ce site accompagnera l’atelier, la définition du prototype, les tests avec les artistes et les premiers relais. Chaque étape rendra visibles les apprentissages et les décisions réellement prises.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contribuer à la première étape</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Le questionnaire permet de recueillir les pratiques, les attentes et les questions qui prépareront le travail collectif. Si vous n’avez pas d’invitation, vous pourrez en demander une depuis ce parcours.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" style={{ backgroundColor: '#E07428', color: '#fff' }} asChild>
              <a href="mailto:ulrich.fischer@memoways.com?subject=Boussole Numérique Culture — Je souhaite participer">
                <MessageSquare className="mr-2 h-4 w-4" />
                Demander une invitation
              </a>
            </Button>
            <Button size="lg" variant="outline" style={{ borderColor: '#E07428', color: '#1f2937' }} asChild>
              <Link href="/timeline">Voir les phases de l’outil <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
