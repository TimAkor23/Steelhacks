"use client"

import type { GameState } from "../lib/types"

import {
  calculateNetWorth,
  formatCurrency,
} from "../lib/gameEngine"

interface ResultsScreenProps {
  game: GameState
  onBackToSaves: () => void
  onPlayAgain: () => void
}

export default function ResultsScreen({
  game,
  onBackToSaves,
  onPlayAgain,
}: ResultsScreenProps) {
  const netWorth = calculateNetWorth(game.stats)

  const lifeBalance = Math.round(
    (game.balance.health +
      game.balance.relationships +
      game.balance.morale +
      game.balance.smarts) /
      4,
  )

  return (
    <main className="ll-screen flex min-h-screen items-center justify-center p-6">
      <section className="ll-panel w-full max-w-3xl p-8 text-center">
        <span className="ll-brand">JOURNEY COMPLETE</span>

        <h1 className="mt-6 text-4xl font-black text-slate-900">
          {game.profile.characterName}&apos;s Results
        </h1>

        <p className="mt-3 text-slate-700">
          You played through {game.currentYear} years of financial decisions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Result label="Final Score" value={String(game.score)} />
          <Result label="Net Worth" value={formatCurrency(netWorth)} />
          <Result label="Life Balance" value={`${lifeBalance}%`} />
        </div>

        <div className="mt-8 text-left">
          <h2 className="text-xl font-black">Your Story</h2>

          <div className="mt-3 max-h-52 space-y-2 overflow-y-auto">
            {game.history.map((entry, index) => (
              <p
                key={`${entry}-${index}`}
                className="rounded-lg border-2 border-slate-800 bg-white p-3"
              >
                {entry}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={onPlayAgain}
            className="ll-btn"
          >
            Play Again
          </button>

          <button
            type="button"
            onClick={onBackToSaves}
            className="ll-btn-primary"
          >
            Save Slots
          </button>
        </div>
      </section>
    </main>
  )
}

function Result({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border-4 border-slate-800 bg-yellow-300 p-4">
      <p className="text-xs font-black uppercase">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  )
}