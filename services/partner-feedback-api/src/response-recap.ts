import { PARTNER_QUESTIONNAIRE_V1 } from "./questionnaire.js";

export type ResponseRecapAnswer = {
  questionKey: string;
  value: unknown;
};

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.filter((item) => item !== null && item !== undefined && String(item).trim()).map(String).join(", ");
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value && typeof value === "object") return JSON.stringify(value);
  return "";
}

export function createResponseRecap(answers: ResponseRecapAnswer[]) {
  const labels = new Map(PARTNER_QUESTIONNAIRE_V1.questions.map((question) => [question.key, question.label]));
  const blocks = answers
    .map((answer) => ({ label: labels.get(answer.questionKey) ?? answer.questionKey, value: formatValue(answer.value) }))
    .filter((answer) => answer.value)
    .map((answer) => `${answer.label}\n${answer.value}`);

  return blocks.length ? blocks.join("\n\n") : "Aucune réponse textuelle n’a été enregistrée.";
}
