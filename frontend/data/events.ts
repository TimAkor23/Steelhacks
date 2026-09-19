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
          debt: 1200,
          stress: 6,
          score: 5,
        },
      },
      {
        text: "Delay the repair",
        icon: "🚗",
        effects: {
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
          savings: 2200,
          score: 20,
        },
      },
      {
        text: "Pay down debt",
        icon: "✂️",
        effects: {
          debt: -1800,
          cash: 800,
          score: 18,
        },
      },
      {
        text: "Spend it on career training",
        icon: "📚",
        effects: {
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
          cash: -400,
          stress: 8,
          score: 9,
        },
      },
      {
        text: "Protect your budget",
        icon: "🚫",
        effects: {
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
          income: 4500,
          investments: 2300,
          score: 25,
        },
      },
      {
        text: "Pay down debt",
        icon: "🏦",
        effects: {
          debt: -2700,
          cash: 1400,
          score: 20,
        },
      },
      {
        text: "Build an emergency fund",
        icon: "🧰",
        effects: {
          savings: 2600,
          score: 18,
        },
      },
    ],
  },
]