"use client"

import { useEffect, useMemo, useState } from "react"

import type { ChoiceEffects, GameChoice, GameState } from "../lib/types"
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

type Reaction = "win" | "loss" | null

export default function GameScreen({
  game,
  onChange,
  onFinish,
  onBackToSaves,
}: GameScreenProps) {
  const normalProgress = Math.max(
    0,
    Math.min(100, ((game.currentYear - 1) / game.maxYears) * 100),
  )

  const [visualProgress, setVisualProgress] = useState(normalProgress)
  const [isResolving, setIsResolving] = useState(false)
  const [reaction, setReaction] = useState<Reaction>(null)

  useEffect(() => {
    setVisualProgress(normalProgress)
    setIsResolving(false)
    setReaction(null)
  }, [normalProgress, game.currentEvent.title])

  const netWorth = calculateNetWorth(game.stats)

  const missionText = useMemo(() => {
    if (game.stats.debt > 25000) {
      return "Debt is holding your progress back. Attack it before it grows."
    }

    if (game.stats.savings >= 10000) {
      return "Your emergency cushion is strong. Keep building future wealth."
    }

    if (game.stats.income >= 70000) {
      return "Your income is climbing. Turn that growth into stability."
    }

    if (game.stats.stress >= 70) {
      return "Stress is high. Protect your health and your cash flow."
    }

    return "Build momentum, save early, and avoid debt traps."
  }, [game.stats])

  function handleChoice(choice: GameChoice) {
    if (isResolving) return

    setIsResolving(true)

    const result = applyChoiceEffects(
      game.stats,
      game.balance,
      game.score,
      choice.effects,
    )

    const updatedGame: GameState = {
      ...game,
      stats: result.stats,
      balance: result.balance,
      score: result.score,
      history: [
        ...game.history,
        `Year ${game.currentYear}: ${choice.text}`,
      ],
    }

    const bigWin = isBigWin(choice.effects)
    const bigLoss = isBigLoss(choice.effects)

    if (bigWin) setReaction("win")
    else if (bigLoss) setReaction("loss")

    const finishedAllYears = game.currentYear >= game.maxYears
    const ranOutOfCash = result.stats.cash < 0
    const lostIncome = result.stats.income <= 0

    if (finishedAllYears || ranOutOfCash || lostIncome) {
      setVisualProgress(100)
      window.setTimeout(() => onFinish(updatedGame), 750)
      return
    }

    const nextEvent = getRandomEvent(game.recentEventTitles)
    const nextYear = game.currentYear + 1

    setVisualProgress(
      Math.min(100, ((nextYear - 1) / game.maxYears) * 100),
    )

    window.setTimeout(() => {
      onChange({
        ...updatedGame,
        currentYear: nextYear,
        currentEvent: nextEvent,
        recentEventTitles: [
          ...game.recentEventTitles,
          nextEvent.title,
        ].slice(-3),
      })
    }, 700)
  }

  const playerPosition = 5 + visualProgress * 0.84

  return (
    <main className="ll-screen min-h-screen overflow-hidden p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="ll-brand">LIFE LEDGER</span>
            <h1 className="mt-3 text-2xl font-black text-white [text-shadow:2px_2px_0_#17324f] md:text-4xl">
              World {game.currentYear}-{game.maxYears}
            </h1>
            <p className="mt-1 font-bold text-slate-800">
              {game.profile.characterName} · {game.profile.occupation}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-lg border-[3px] border-slate-800 bg-yellow-300 px-4 py-2 font-black shadow-[0_4px_0_#17324f]">
              Score {game.score}
            </span>
            <button
              type="button"
              onClick={onBackToSaves}
              disabled={isResolving}
              className="ll-btn disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save & Exit
            </button>
          </div>
        </header>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_360px]">
          <section
            className={`ll-panel overflow-hidden p-3 md:p-4 ${
              reaction === "loss" ? "animate-[llShake_.45s_ease-in-out]" : ""
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                  Live game
                </p>
                <p className="mt-1 font-bold text-slate-700">{missionText}</p>
              </div>
              <div className="rounded-lg border-2 border-slate-800 bg-white px-3 py-2 text-right">
                <p className="text-[10px] font-black uppercase text-slate-500">Cash</p>
                <strong>{formatCurrency(game.stats.cash)}</strong>
              </div>
            </div>

            <div className="relative h-[500px] overflow-hidden rounded-xl border-4 border-slate-800 bg-[linear-gradient(180deg,#169ee8_0%,#68dbff_58%,#b4ee73_100%)]">
              <div aria-hidden="true" className="absolute left-[7%] top-8 text-5xl opacity-95">☁️</div>
              <div aria-hidden="true" className="absolute right-[8%] top-16 text-4xl opacity-90">☁️</div>
              <div aria-hidden="true" className="absolute left-[31%] top-24 animate-bounce text-3xl">🪙</div>
              <div aria-hidden="true" className="absolute right-[26%] top-32 animate-bounce text-3xl [animation-delay:250ms]">🪙</div>

              <div aria-hidden="true" className="absolute bottom-[72px] left-0 h-32 w-full bg-[radial-gradient(ellipse_at_bottom,#5bbf3a_0%,#7bdc58_52%,transparent_54%)] opacity-90" />
              <div aria-hidden="true" className="absolute bottom-0 left-0 h-[78px] w-full border-t-4 border-slate-800 bg-[repeating-linear-gradient(90deg,#8b5a2b_0_28px,#9e6a36_28px_56px)]" />
              <div aria-hidden="true" className="absolute bottom-[76px] left-0 h-4 w-full bg-green-500" />

              <div aria-hidden="true" className="absolute bottom-[82px] left-[28%] text-4xl">👾</div>
              <div aria-hidden="true" className="absolute bottom-[82px] left-[53%] text-4xl">💸</div>
              <div aria-hidden="true" className="absolute bottom-[82px] left-[73%] text-4xl">🧾</div>
              <div aria-hidden="true" className="absolute bottom-[77px] right-[3%] text-6xl">🏁</div>

              <div
                aria-label={`Player is ${Math.round(visualProgress)} percent through the game`}
                className="absolute bottom-[78px] z-20 text-6xl transition-[left,transform] duration-700 ease-out"
                style={{
                  left: `${playerPosition}%`,
                  transform: reaction === "win" ? "translateY(-28px)" : "translateY(0)",
                }}
              >
                🧍
              </div>

              {reaction === "win" && (
                <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden="true">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span
                      key={index}
                      className="absolute animate-bounce text-2xl"
                      style={{
                        left: `${5 + ((index * 17) % 90)}%`,
                        top: `${4 + ((index * 23) % 65)}%`,
                        animationDelay: `${index * 35}ms`,
                      }}
                    >
                      {index % 2 === 0 ? "⭐" : "🪙"}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-2xl border-4 border-slate-800 bg-[#fff8cf]">
                <div className="rounded-2xl border-4 border-slate-800 bg-[#fff8cf]/95 p-4 shadow-[0_8px_0_#17324f] backdrop-blur-sm md:p-6">
                  <div className="flex gap-4">
                    <span className="text-4xl md:text-5xl">{game.currentEvent.icon ?? "🎲"}</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">Decision point</p>
                      <h2 className="mt-1 text-xl font-black text-slate-900 md:text-2xl">{game.currentEvent.title}</h2>
                      <p className="mt-2 text-sm font-medium text-slate-700 md:text-base">{game.currentEvent.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {game.currentEvent.choices.map((choice) => (
                      <button
                        key={choice.text}
                        type="button"
                        disabled={isResolving}
                        onClick={() => handleChoice(choice)}
                        className="rounded-lg border-[3px] border-slate-800 bg-yellow-300 px-4 py-3 text-left text-sm font-black shadow-[0_4px_0_#17324f] transition hover:-translate-y-0.5 hover:bg-yellow-200 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-60"
                      >
                        <span className="mr-2">{choice.icon ?? "🎯"}</span>
                        {choice.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 z-30 rounded-lg border-[3px] border-slate-800 bg-white/95 p-2 shadow-[0_3px_0_#17324f]">
                <div className="mb-1 flex justify-between text-[10px] font-black uppercase tracking-wider">
                  <span>Journey progress</span>
                  <span>{Math.round(visualProgress)}%</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full border-2 border-slate-800 bg-slate-100">
                  <div
                    className="h-full bg-[linear-gradient(90deg,#ffd43b,#23c483)] transition-[width] duration-700 ease-out"
                    style={{ width: `${visualProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          <aside className="ll-panel p-4 md:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Live Stats</h2>
              <span className="rounded-md border-2 border-slate-800 bg-red-500 px-2 py-1 text-xs font-black text-white">
                YEAR {game.currentYear}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Stat label="Cash" value={formatCurrency(game.stats.cash)} />
              <Stat label="Debt" value={formatCurrency(game.stats.debt)} />
              <Stat label="Income" value={formatCurrency(game.stats.income)} />
              <Stat label="Bills" value={formatCurrency(game.stats.bills)} />
              <Stat label="Savings" value={formatCurrency(game.stats.savings)} />
              <Stat label="Invest" value={formatCurrency(game.stats.investments)} />
              <Stat label="Stress" value={`${Math.round(game.stats.stress)}/100`} />
              <Stat label="Net Worth" value={formatCurrency(netWorth)} />
            </div>

            <h3 className="mt-6 text-lg font-black">Life Balance</h3>
            <div className="mt-3 space-y-3">
              <Meter label="Health" value={game.balance.health} color="#22c55e" />
              <Meter label="Relationships" value={game.balance.relationships} color="#ec4899" />
              <Meter label="Morale" value={game.balance.morale} color="#f59e0b" />
              <Meter label="Smarts" value={game.balance.smarts} color="#3b82f6" />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-wider">Recent choices</h3>
              <div className="mt-2 max-h-32 space-y-2 overflow-y-auto pr-1 text-xs">
                {game.history.length === 0 ? (
                  <p className="rounded-lg border-2 border-dashed border-slate-400 bg-white/60 p-3 text-slate-500">
                    Your story begins with this decision.
                  </p>
                ) : (
                  game.history
                    .slice(-3)
                    .reverse()
                    .map((entry, index) => (
                      <p key={`${entry}-${index}`} className="rounded-lg border-2 border-slate-800 bg-white p-2 font-semibold">
                        {entry}
                      </p>
                    ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        @keyframes llShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-7px); }
          50% { transform: translateX(7px); }
          75% { transform: translateX(-4px); }
        }
      `}</style>
    </main>
  )
}

function isBigWin(effects: ChoiceEffects) {
  return (
    (effects.score ?? 0) >= 20 ||
    (effects.income ?? 0) >= 3000 ||
    (effects.investments ?? 0) >= 2000 ||
    (effects.morale ?? 0) >= 10 ||
    (effects.smarts ?? 0) >= 10
  )
}

function isBigLoss(effects: ChoiceEffects) {
  return (
    (effects.savings ?? 0) < -1000 ||
    (effects.debt ?? 0) > 1500 ||
    (effects.cash ?? 0) < -1200 ||
    (effects.stress ?? 0) >= 12 ||
    (effects.health ?? 0) <= -10 ||
    (effects.morale ?? 0) <= -10
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border-2 border-slate-800 bg-white p-2.5">
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <strong className="text-sm text-slate-900">{value}</strong>
    </div>
  )
}

function Meter({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  const safeValue = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{Math.round(safeValue)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-slate-800 bg-white">
        <div
          className="h-full transition-[width] duration-500"
          style={{ width: `${safeValue}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
