export type QuestionKind = "likert" | "single" | "multiple" | "short_text" | "long_text" | "voice_text";

export type QuestionnaireQuestion = {
  key: string;
  section: string;
  label: string;
  helper?: string;
  kind: QuestionKind;
  required?: boolean;
  options?: string[];
  likert?: { minLabel: string; maxLabel: string };
  allowVoice?: boolean;
};

export const PARTNER_QUESTIONNAIRE_V1 = {
  code: "partner-discovery-v1",
  title: "Partager mes idées et feedbacks",
  estimatedMinutes: 12,
  questions: [
    { key: "organization_role", section: "Votre organisation", label: "Quel rôle votre organisation joue-t-elle principalement dans l’écosystème culturel ?", kind: "single", required: true, options: ["Réseau ou fédération", "Lieu ou structure de diffusion", "Accompagnement ou formation", "Institution publique", "Création ou production", "Autre"] },
    { key: "audiences", section: "Votre organisation", label: "Quels publics ou membres votre organisation sert-elle ?", kind: "multiple", required: true, options: ["Artistes et créatrices ou créateurs", "Indépendantes et indépendants", "Structures culturelles", "Publics et communautés", "Étudiantes et étudiants", "Professionnelles et professionnels de la culture", "Autre"] },
    { key: "needs_urgency", section: "Besoins et enjeux", label: "À quel point les difficultés numériques de vos membres ou publics nécessitent-elles une réponse maintenant ?", kind: "likert", required: true, likert: { minLabel: "Pas prioritaire", maxLabel: "Très prioritaire" } },
    { key: "needs_open", section: "Besoins et enjeux", label: "Quels besoins, situations ou enjeux souhaitez-vous voir mieux pris en compte ?", helper: "Vous pouvez répondre par écrit ou à l’oral.", kind: "long_text", allowVoice: true },
    { key: "hypothesis_fit", section: "Hypothèses de la Boussole", label: "Une Boussole qui aide à situer les pratiques et choisir des pistes d’action vous semble-t-elle utile pour vos membres ou publics ?", kind: "likert", required: true, likert: { minLabel: "Pas utile", maxLabel: "Très utile" } },
    { key: "hypothesis_concerns", section: "Hypothèses de la Boussole", label: "Quelles réserves, craintes ou conditions de réussite voyez-vous pour ce projet ?", helper: "Vous pouvez répondre par écrit ou à l’oral.", kind: "long_text", allowVoice: true },
    { key: "distribution_channels", section: "Valeur et distribution", label: "Par quels canaux pourriez-vous faire connaître la Boussole ?", kind: "multiple", options: ["Newsletter", "Événements", "Accompagnement individuel", "Ateliers", "Réseaux sociaux", "Relais partenaires", "Je ne sais pas encore"] },
    { key: "strategic_value", section: "Valeur et distribution", label: "La Boussole pourrait-elle renforcer la mission de votre organisation ?", kind: "likert", required: true, likert: { minLabel: "Pas du tout", maxLabel: "Beaucoup" } },
    { key: "codesign_contribution", section: "Co-design", label: "À quelles formes de co-conception pourriez-vous contribuer ?", kind: "multiple", options: ["Relire les questions", "Tester des écrans", "Participer à un atelier", "Mettre en relation avec des membres", "Partager des retours de terrain", "Contribuer à l’accompagnement conversationnel"] },
    { key: "codesign_open", section: "Co-design", label: "Quelle idée ou quel feedback serait stratégiquement important pour construire une Boussole utile ?", helper: "Vous pouvez répondre par écrit ou à l’oral.", kind: "long_text", allowVoice: true },
  ] satisfies QuestionnaireQuestion[],
};
