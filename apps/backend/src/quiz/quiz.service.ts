import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuizSession, QuizSessionDocument } from './quiz-session.schema';

// Données hardcodées des quiz — seront mises à jour quand les .md seront finalisés
const QUIZ_DATA: Record<string, { questions: { question: string; options: string[]; correctIndex: number; explication: string }[] }> = {
  'icebreaker': {
    questions: [
      {
        question: "Quelle part de l'empreinte d'un smartphone vient de sa fabrication ?",
        options: ["20%", "50%", "80%", "95%"],
        correctIndex: 2,
        explication: "80% de l'empreinte carbone d'un smartphone est due à sa fabrication (extraction minières, assemblage). L'usage ne représente que 20%. Source : ADEME 2022",
      },
      {
        question: "Quel équipement consomme le plus pendant 1h de streaming vidéo ?",
        options: ["Le serveur de streaming", "Le réseau de télécommunication", "L'écran de l'utilisateur", "Le routeur WiFi"],
        correctIndex: 2,
        explication: "L'écran de l'utilisateur est le plus consommateur lors du streaming. Le terminal utilisateur représente 50 à 80% de la consommation totale. Source : The Shift Project",
      },
      {
        question: "Le numérique représente environ combien % des émissions mondiales de GES ?",
        options: ["1%", "4%", "10%", "20%"],
        correctIndex: 1,
        explication: "Le numérique représente ~4% des émissions mondiales de GES, en croissance de +8%/an. À ce rythme, il pourrait dépasser l'aviation d'ici 2030. Source : GreenIT.fr 2023",
      },
      {
        question: "Combien de critères contient le RGESN 2024 ?",
        options: ["42", "65", "78", "120"],
        correctIndex: 2,
        explication: "Le RGESN 2024 (Référentiel Général d'Écoconception des Services Numériques) contient 78 critères répartis en 9 thématiques. Porté par Arcep, DINUM et MiNumEco.",
      },
      {
        question: "Un email sans pièce jointe envoyé à 10 personnes = combien de gCO₂e ?",
        options: ["0.1 gCO₂e", "4 gCO₂e", "50 gCO₂e", "200 gCO₂e"],
        correctIndex: 1,
        explication: "Un email simple envoyé à 10 personnes émet ~4 gCO₂e. Avec une pièce jointe de 1Mo, on monte à 19 gCO₂e. Multiplié par des milliards d'emails/jour, l'impact est massif. Source : ADEME",
      },
    ],
  },
  'mi-journee': {
    questions: [
      {
        question: "Quels sont les 3 grands postes d'émission du numérique, dans l'ordre décroissant ?",
        options: [
          "Datacenters > Réseaux > Terminaux",
          "Terminaux > Réseaux > Datacenters",
          "Réseaux > Terminaux > Datacenters",
          "Datacenters > Terminaux > Réseaux",
        ],
        correctIndex: 1,
        explication: "Les terminaux utilisateurs (PC, smartphones, TV) représentent la plus grande part, suivis des réseaux, puis des datacenters. La règle des 80% : 80% vient des équipements.",
      },
      {
        question: "La fabrication des laptops des salariés d'une ESN correspond à quel scope GHG ?",
        options: ["Scope 1", "Scope 2", "Scope 3", "Hors scope"],
        correctIndex: 2,
        explication: "Le Scope 3 couvre toutes les émissions indirectes : achats de biens et services, y compris la fabrication des équipements des collaborateurs. Pour une ESN, le Scope 3 représente +80% de l'empreinte totale.",
      },
      {
        question: "Combien de thématiques contient le RGESN 2024 ?",
        options: ["6", "8", "9", "12"],
        correctIndex: 2,
        explication: "Le RGESN 2024 est structuré en 9 thématiques : Stratégie, Spécification, Architecture, UX/Interface, Contenus, Frontend, Backend, Hébergement, et Algorithmie/IA (ajoutée en 2024).",
      },
      {
        question: "Quelle thématique a été ajoutée dans le RGESN 2024 par rapport à la version 2022 ?",
        options: ["Accessibilité", "Sécurité", "Algorithmie / IA", "Performance"],
        correctIndex: 2,
        explication: "La thématique 'Algorithmie / IA' est la grande nouveauté du RGESN 2024, reflétant l'impact croissant de l'IA sur l'empreinte numérique (modèles LLM, entraînement GPU, etc.).",
      },
      {
        question: "Quelle loi française crée une obligation de déclaration d'écoconception pour les services publics ?",
        options: ["Loi Climat et Résilience", "Loi REEN", "Directive CSRD", "Loi Pacte"],
        correctIndex: 1,
        explication: "La loi REEN (Réduction de l'Empreinte Environnementale du Numérique) de 2021 impose aux collectivités et services publics une déclaration d'écoconception. Les ESN qui travaillent pour le public doivent s'y préparer.",
      },
    ],
  },
  'final': {
    questions: [
      {
        question: "Quel % de l'empreinte d'un smartphone vient de sa fabrication ?",
        options: ["20%", "50%", "80%", "95%"],
        correctIndex: 2,
        explication: "80% — règle fondamentale du numérique responsable. Le levier principal n'est pas l'énergie mais la longévité des équipements.",
      },
      {
        question: "Parmi ces thématiques, lesquelles font partie du RGESN ? (choisissez la bonne liste)",
        options: [
          "SEO, Accessibilité, Performance, Sécurité",
          "Stratégie, Spécification, Architecture, Hébergement",
          "DevOps, CI/CD, Testing, Monitoring",
          "RGPD, CSRD, REEN, GR491",
        ],
        correctIndex: 1,
        explication: "Stratégie, Spécification, Architecture, UX/Interface, Contenus, Frontend, Backend, Hébergement, Algorithmie/IA — ce sont les 9 thématiques du RGESN 2024.",
      },
      {
        question: "Quelle thématique a été ajoutée dans le RGESN 2024 ?",
        options: ["Accessibilité", "Performance", "Algorithmie / IA", "Sécurité"],
        correctIndex: 2,
        explication: "Algorithmie / IA — ajoutée pour couvrir l'empreinte croissante des modèles d'IA, du machine learning et des algorithmes gourmands en ressources.",
      },
      {
        question: "Quel outil gratuit permet de noter l'écoconception d'une URL de A à G ?",
        options: ["Lighthouse", "EcoIndex", "GTmetrix", "NumEcoDiag"],
        correctIndex: 1,
        explication: "EcoIndex (ecoindex.fr) attribue une note A→G basée sur 3 variables : le poids de la page, le nombre de requêtes HTTP, et la complexité du DOM.",
      },
      {
        question: "Un cache Redis répond à quelle thématique RGESN ?",
        options: ["Frontend (06)", "Backend (07)", "Architecture (03)", "Hébergement (08)"],
        correctIndex: 1,
        explication: "Backend (07) — critère : 'Mettre en cache les données calculées'. Redis/Memcached évitent de recalculer des données identiques à chaque requête.",
      },
      {
        question: "La loi REEN vise en priorité quels types de services ?",
        options: ["Les startups SaaS", "Les services numériques publics", "Les ESN de +500 salariés", "Les e-commerces"],
        correctIndex: 1,
        explication: "La loi REEN cible les services numériques publics (collectivités, État). Les ESN privées ne sont pas encore visées directement, mais leurs clients publics l'exigeront dans les AO.",
      },
      {
        question: "Les laptops des salariés d'une ESN correspondent à quel scope GHG Protocol ?",
        options: ["Scope 1", "Scope 2", "Scope 3", "Aucun"],
        correctIndex: 2,
        explication: "Scope 3 — émissions indirectes liées aux achats. Pour une ESN, le Scope 3 (fabrication équipements, déplacements, cloud) représente souvent +80% de l'empreinte totale.",
      },
      {
        question: "Dans le tableur RGESN, que signifie 'N/A' pour un critère ?",
        options: ["Non Atteint", "Non Applicable", "Non Audité", "Niveau Avancé"],
        correctIndex: 1,
        explication: "N/A = Non Applicable. Certains critères ne s'appliquent pas à tous les services (ex: un critère sur la vidéo N/A pour une appli sans vidéo). Le RGESN demande du jugement contextuel.",
      },
      {
        question: "Quel outil DINUM est basé sur le RGESN et génère un rapport exportable ?",
        options: ["EcoIndex", "Lighthouse CI", "NumEcoDiag", "Scaphandre"],
        correctIndex: 2,
        explication: "NumEcoDiag (ecoresponsable.numerique.gouv.fr/numecodiag) est l'outil officiel DINUM : questionnaire guidé RGESN + rapport PDF exportable. Idéal pour un premier audit en 20 minutes.",
      },
      {
        question: "Parmi ces exemples, lequel est un critère d'acceptance environnemental valide pour une user story ?",
        options: [
          "La page doit être jolie sur mobile",
          "La fonctionnalité doit être rapide",
          "Le poids total de la page ne dépasse pas 500 Ko et le nombre de requêtes HTTP ne dépasse pas 20",
          "Le service doit respecter le RGESN",
        ],
        correctIndex: 2,
        explication: "Un bon critère d'acceptance environnemental est spécifique, mesurable et testable (poids de page en Ko, nb requêtes, score EcoIndex avec seuil). 'Respecter le RGESN' ou 'être rapide' ne sont pas testables directement.",
      },
    ],
  },
};

@Injectable()
export class QuizService {
  constructor(@InjectModel(QuizSession.name) private quizModel: Model<QuizSessionDocument>) {}

  getQuizMeta(quizId: string) {
    const quiz = QUIZ_DATA[quizId];
    if (!quiz) return null;
    return {
      id: quizId,
      totalQuestions: quiz.questions.length,
      questions: quiz.questions.map((q, i) => ({
        index: i,
        question: q.question,
        options: q.options,
      })),
    };
  }

  async submit(userId: string, quizId: string, answers: { questionIndex: number; selectedIndex: number }[]) {
    const quiz = QUIZ_DATA[quizId];
    if (!quiz) throw new Error('Quiz introuvable');

    let score = 0;
    const correction = answers.map((a) => {
      const q = quiz.questions[a.questionIndex];
      const correct = q.correctIndex === a.selectedIndex;
      if (correct) score++;
      return {
        questionIndex: a.questionIndex,
        selectedIndex: a.selectedIndex,
        correctIndex: q.correctIndex,
        correct,
        explication: q.explication,
      };
    });

    await this.quizModel.create({
      userId: new Types.ObjectId(userId),
      quizId,
      answers,
      score,
      completedAt: new Date(),
    });

    return { score, total: quiz.questions.length, correction };
  }

  async getSessionsByUser(userId: string) {
    return this.quizModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async getAllSessions() {
    return this.quizModel
      .find()
      .populate('userId', 'email nom prenom role')
      .sort({ completedAt: -1 })
      .exec();
  }
}
