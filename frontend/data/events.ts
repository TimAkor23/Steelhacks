import type { LifeEvent } from "../lib/types"

export const eventTemplates: LifeEvent[] = [
  {
    title: "First job offer",
    description:
      "A local business offers you a steady role with room to grow.",
    choices: [
      {
        text: "Take the job",
        icon: "💼",
        effects: {
          health: -2, relationships: -2, morale: 6, smarts: 3,
          income: 9000,
          cash: 2500,
          savings: 1000,
          score: 18,
        },
      },
      {
        text: "Keep your current job and build skills",
        icon: "🛠️",
        effects: {
          health: 2, relationships: 1, morale: 4, smarts: 8,
          income: 2000,
          savings: 1500,
          stress: -6,
          score: 12,
        },
      },
      {
        text: "Focus on school",
        icon: "🎓",
        effects: {
          health: 3, relationships: -1, morale: 5, smarts: 10,
          stress: -12,
          cash: 400,
          savings: 1200,
          score: 10,
        },
      },
    ],
  },
  {
    title: "Car repair bill",
    description:
      "Your transportation needs a surprise repair before the month ends.",
    choices: [
      {
        text: "Use savings to fix it",
        icon: "💸",
        effects: {
          health: 2, relationships: 0, morale: -2, smarts: 3,
          savings: -1800,
          cash: -600,
          stress: 8,
          score: 4,
        },
      },
      {
        text: "Borrow money and repay it later",
        icon: "🤝",
        effects: {
          health: -2, relationships: -3, morale: -3, smarts: 1,
          debt: 1200,
          stress: 6,
          score: 5,
        },
      },
      {
        text: "Delay the repair",
        icon: "🚗",
        effects: {
          health: -5, relationships: -2, morale: -5, smarts: 0,
          cash: -500,
          stress: 10,
          score: 2,
        },
      },
    ],
  },
  {
    title: "Tax refund surprise",
    description: "Your tax return comes back bigger than expected.",
    choices: [
      {
        text: "Put it into savings",
        icon: "🏦",
        effects: {
          health: 2, relationships: 0, morale: 5, smarts: 2,
          savings: 2200,
          score: 20,
        },
      },
      {
        text: "Pay down debt",
        icon: "✂️",
        effects: {
          health: 3, relationships: 1, morale: 6, smarts: 3,
          debt: -1800,
          cash: 800,
          score: 18,
        },
      },
      {
        text: "Spend it on career training",
        icon: "📚",
        effects: {
          health: 1, relationships: -1, morale: 6, smarts: 10,
          investments: 1500,
          income: 3000,
          stress: -4,
          score: 16,
        },
      },
    ],
  },
  {
    title: "Rent increase",
    description:
      "Your landlord raises the monthly rent and your budget tightens.",
    choices: [
      {
        text: "Move somewhere cheaper",
        icon: "📦",
        effects: {
          health: 3, relationships: -3, morale: 4, smarts: 3,
          bills: -260,
          savings: 900,
          stress: -8,
          score: 17,
        },
      },
      {
        text: "Find a roommate",
        icon: "👥",
        effects: {
          health: 2, relationships: 7, morale: 4, smarts: 2,
          cash: 600,
          savings: 1000,
          stress: -6,
          score: 15,
        },
      },
      {
        text: "Stay and reduce other spending",
        icon: "✂️",
        effects: {
          health: -3, relationships: -2, morale: -4, smarts: 3,
          cash: -300,
          stress: 12,
          score: 8,
        },
      },
    ],
  },
  {
    title: "Family emergency",
    description: "A family expense arrives while money is already tight.",
    choices: [
      {
        text: "Help immediately",
        icon: "🤲",
        effects: {
          health: -4, relationships: 10, morale: 3, smarts: 1,
          cash: -1500,
          savings: -1000,
          stress: 16,
          score: 4,
        },
      },
      {
        text: "Offer a smaller payment plan",
        icon: "🕒",
        effects: {
          health: -1, relationships: 5, morale: 2, smarts: 4,
          cash: -400,
          stress: 8,
          score: 9,
        },
      },
      {
        text: "Protect your budget",
        icon: "🚫",
        effects: {
          health: 2, relationships: -5, morale: -2, smarts: 2,
          stress: -6,
          score: 12,
        },
      },
    ],
  },
  {
    title: "Side hustle win",
    description:
      "A small business project begins bringing in extra money.",
    choices: [
      {
        text: "Reinvest into the business",
        icon: "🚀",
        effects: {
          health: -3, relationships: -2, morale: 7, smarts: 7,
          income: 4500,
          investments: 2300,
          score: 25,
        },
      },
      {
        text: "Pay down debt",
        icon: "🏦",
        effects: {
          health: 3, relationships: 1, morale: 6, smarts: 3,
          debt: -2700,
          cash: 1400,
          score: 20,
        },
      },
      {
        text: "Build an emergency fund",
        icon: "🧰",
        effects: {
          health: 4, relationships: 2, morale: 5, smarts: 3,
          savings: 2600,
          score: 18,
        },
      },
    ],
  },
]