import { eventTemplates } from "../data/events"
import { scenarioTemplates } from "../data/scenarios"

import type {
  ChoiceEffects,
  GameStats,
  LifeBalance,
  LifeEvent,
  PlayStyle,
  StarterScenario,
} from "./types"

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

export function createStarterScenario(
  playStyle: PlayStyle,
): StarterScenario {
  const randomIndex = Math.floor(Math.random() * scenarioTemplates.length)
  const base = scenarioTemplates[randomIndex]
  const scenario: StarterScenario = { ...base }

  if (playStyle === "saver") {
    scenario.income *= 0.94
    scenario.debt *= 0.75
    scenario.savings += 2800
    scenario.bills *= 0.92
    scenario.stress -= 8
  }

  if (playStyle === "builder") {
    scenario.income *= 1.08
    scenario.savings += 900
    scenario.investments += 1500
    scenario.debt *= 0.9
  }

  if (playStyle === "risk") {
    scenario.income *= 1.14
    scenario.debt *= 1.2
    scenario.investments += 2400
    scenario.stress += 10
  }

  return {
    ...scenario,
    income: Math.round(scenario.income),
    bills: Math.round(scenario.bills),
    taxes: Math.round(scenario.taxes),
    debt: Math.round(scenario.debt),
    savings: Math.round(scenario.savings),
    investments: Math.round(scenario.investments),
    cash: Math.round(scenario.cash),
    stress: clamp(scenario.stress, 0, 100),
  }
}

export function getRandomEvent(
  excludedTitles: string[] = [],
): LifeEvent {
  const availableEvents = eventTemplates.filter(
    (event) => !excludedTitles.includes(event.title),
  )

  const eventPool =
    availableEvents.length > 0 ? availableEvents : eventTemplates

  const randomIndex = Math.floor(Math.random() * eventPool.length)

  return eventPool[randomIndex]
}

export function applyChoiceEffects(
  currentStats: GameStats,
  currentBalance: LifeBalance,
  currentScore: number,
  effects: ChoiceEffects,
) {
  const updatedStats: GameStats = {
    income: Math.max(0, currentStats.income + (effects.income ?? 0)),
    bills: Math.max(0, currentStats.bills + (effects.bills ?? 0)),
    taxes: Math.max(0, currentStats.taxes + (effects.taxes ?? 0)),
    debt: Math.max(0, currentStats.debt + (effects.debt ?? 0)),
    savings: Math.max(0, currentStats.savings + (effects.savings ?? 0)),
    investments: Math.max(
      0,
      currentStats.investments + (effects.investments ?? 0),
    ),
    cash: currentStats.cash + (effects.cash ?? 0),
    stress: clamp(
      currentStats.stress + (effects.stress ?? 0),
      0,
      100,
    ),
  }

  const updatedBalance: LifeBalance = {
    health: clamp(
    currentBalance.health +
      (effects.health ?? Math.round(-(effects.stress ?? 0) * 0.35)),
    0,
    100,
  ),

  relationships: clamp(
    currentBalance.relationships + (effects.relationships ?? 0),
    0,
    100,
  ),

  morale: clamp(
    currentBalance.morale +
      (effects.morale ?? Math.round((effects.score ?? 0) / 8)),
    0,
    100,
  ),

  smarts: clamp(
    currentBalance.smarts + (effects.smarts ?? 0),
    0,
    100,
  ),
}

  return {
    stats: updatedStats,
    balance: updatedBalance,
    score: Math.max(0, currentScore + (effects.score ?? 0)),
  }
}

export function calculateNetWorth(stats: GameStats) {
  return stats.cash + stats.savings + stats.investments - stats.debt
}

// Setbacks describe resource costs, not a judgment that a life choice is wrong.
export function getChoiceMovement(effects: ChoiceEffects): -1 | 1 {
  const financialSetback = (effects.cash ?? 0) < 0 ||
    (effects.savings ?? 0) < 0 || (effects.investments ?? 0) < 0 ||
    (effects.income ?? 0) < 0 || (effects.debt ?? 0) > 0 ||
    (effects.bills ?? 0) > 0 || (effects.stress ?? 0) > 0
  return financialSetback ? -1 : 1
}
