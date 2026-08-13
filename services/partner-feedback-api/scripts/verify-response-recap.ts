import assert from "node:assert/strict";
import { createResponseRecap } from "../src/response-recap.js";

const recap = createResponseRecap([
  { questionKey: "organization_role", value: "Institution publique" },
  { questionKey: "audiences", value: ["Structures culturelles", "Publics et communautés"] },
  { questionKey: "needs_open", value: "Un accompagnement progressif et concret." },
  { questionKey: "codesign_open", value: "Prévoir un atelier avec les membres." },
]);

assert.match(recap, /Quel rôle votre organisation joue-t-elle principalement/);
assert.match(recap, /Institution publique/);
assert.match(recap, /Structures culturelles, Publics et communautés/);
assert.match(recap, /Un accompagnement progressif et concret\./);
assert.match(recap, /Prévoir un atelier avec les membres\./);
assert.equal(createResponseRecap([]), "Aucune réponse textuelle n’a été enregistrée.");

console.log("Récapitulatif partenaire vérifié.");
