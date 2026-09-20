"use client"

import type { GameChoice, GameState } from "../lib/types"

import {
  applyChoiceEffects,
  calculateNetWorth,
  formatCurrency,
  getRandomEvent,
} from "../lib/gameEngine"

interface GameScreenProps {
  game: GameState
  onChange: (game: GameState) => void
  onFinish: (game: GameState) => void
  onBackToSaves: () => void
}

export default function GameScreen({
  game,
  onChange,
  onFinish,
  onBackToSaves,
}: GameScreenProps) {
  const handleChoice = (choice: GameChoice) => {
    const result = applyChoiceEffects(
      game.stats,
      game.balance,
      game.score,
      choice.effects,
    )

    const historyEntry = `Year ${game.currentYear}: ${choice.text}`

    const updatedGame: GameState = {
      ...game,
      stats: result.stats,
      balance: result.balance,
      score: result.score,
      history: [...game.history, historyEntry],
    }

    const gameOver =
      result.stats.cash < 0 ||
      result.stats.income <= 0 ||
      game.currentYear >= game.maxYears

    if (gameOver) {
      onFinish(updatedGame)
      return
    }

    const nextEvent = getRandomEvent(game.recentEventTitles)

    onChange({
      ...updatedGame,
      currentYear: game.currentYear + 1,
      currentEvent: nextEvent,
      recentEventTitles: [
        ...game.recentEventTitles,
        nextEvent.title,
      ].slice(-3),
    })
  }

  const netWorth = calculateNetWorth(game.stats)

  return (
    <main className="ll-screen min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="ll-brand">LIFE LEDGER</span>

            <h1 className="mt-4 text-3xl font-black text-white">
              Year {game.currentYear} of {game.maxYears}
            </h1>

            <p className="mt-2 font-semibold text-slate-800">
              {game.profile.characterName} · {game.profile.occupation}
            </p>
          </div>

          <div className="flex gap-3">
            <span className="rounded-lg border-2 border-slate-800 bg-yellow-300 px-4 py-2 font-bold">
              Score {game.score}
            </span>

            <button
              type="button"
              onClick={onBackToSaves}
              className="ll-btn"
            >
              Save & Exit
            </button>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <section className="ll-panel p-6">
            <p className="text-4xl">
              {game.currentEvent.icon ?? "🎲"}
            </p>

            <p className="mt-4 text-xs font-black uppercase tracking-widest text-red-600">
              Decision Point
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              {game.currentEvent.title}
            </h2>

            <p className="mt-3 text-slate-700">
              {game.currentEvent.description}
            </p>

            <div className="mt-6 grid gap-3">
              {game.currentEvent.choices.map((choice) => (
                <button
                  key={choice.text}
                  type="button"
                  onClick={() => handleChoice(choice)}
                  className="rounded-xl border-4 border-slate-800 bg-yellow-300 p-4 text-left font-bold shadow-[0_5px_0_#17324f] transition hover:-translate-y-1 hover:bg-yellow-200 active:translate-y-1 active:shadow-none"
                >
                  <span className="mr-2">{choice.icon ?? "🎯"}</span>
                  {choice.text}
                </button>
              ))}
            </div>
          </section>

          <aside className="ll-panel p-5">
            <h2 className="text-xl font-black">Your Stats</h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Cash" value={formatCurrency(game.stats.cash)} />
              <Stat label="Debt" value={formatCurrency(game.stats.debt)} />
              <Stat label="Income" value={formatCurrency(game.stats.income)} />
              <Stat label="Bills" value={formatCurrency(game.stats.bills)} />
              <Stat label="Savings" value={formatCurrency(game.stats.savings)} />
              <Stat
                label="Investments"
                value={formatCurrency(game.stats.investments)}
              />
              <Stat label="Stress" value={`${game.stats.stress}/100`} />
              <Stat label="Net Worth" value={formatCurrency(netWorth)} />
            </div>

            <h3 className="mt-6 font-black">Life Balance</h3>

            <div className="mt-3 space-y-3">
              <Meter label="Health" value={game.balance.health} />
              <Meter
                label="Relationships"
                value={game.balance.relationships}
              />
              <Meter label="Morale" value={game.balance.morale} />
              <Meter label="Smarts" value={game.balance.smarts} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border-2 border-slate-800 bg-white p-3">
      <p className="text-xs font-bold uppercase text-slate-500">
        {label}
      </p>
      <strong className="text-slate-900">{value}</strong>
    </div>
  )
}

function Meter({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{Math.round(value)}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full border border-slate-800 bg-white">
        <div
          className="h-full bg-emerald-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}