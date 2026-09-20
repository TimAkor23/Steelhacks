"use client"

import { useEffect, useState } from "react"

import type {
  GameState,
  SaveData,
  SaveSlot,
} from "../lib/types"

import { calculateNetWorth, getRandomEvent } from "../lib/gameEngine"
import { loadSaveSlots, storeSaveSlots } from "../lib/SaveGame"

import TitleScreen from "../components/TitleScreen"
import SaveSlotScreen from "../components/SaveSlotScreen"
import SetupScreen, {
  type CharacterSetup,
} from "../components/SetupScreen"
import GameScreen from "../components/GameScreen"
import ResultsScreen from "../components/ResultsScreen"

type Screen = "title" | "saves" | "setup" | "game" | "results"

const INITIAL_SAVES: SaveSlot[] = [null, null, null]

function createSaveData(game: GameState, completed = false): SaveData {
  return {
    characterName: game.profile.characterName,
    occupation: game.profile.occupation,
    age: game.profile.startingAge + game.currentYear - 1,
    currentYear: game.currentYear,
    netWorth: calculateNetWorth(game.stats),
    completed,
    game,
  }
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("title")
  const [saves, setSaves] = useState<SaveSlot[]>(INITIAL_SAVES)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [activeGame, setActiveGame] = useState<GameState | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSaves(loadSaveSlots()))
    return () => cancelAnimationFrame(frame)
  }, [])

  const saveGameToSelectedSlot = (game: GameState, completed = false) => {
    if (selectedSlot === null) return

    const saveData = createSaveData(game, completed)

    setSaves((previous) => {
      const updated = previous.map((save, index) =>
        index === selectedSlot - 1 ? saveData : save,
      )
      storeSaveSlots(updated)
      return updated
    })
  }

  const handleDeleteSlot = (slotNumber: number) => {
    setSaves((previous) => {
      const updated = previous.map((save, index) =>
        index === slotNumber - 1 ? null : save,
      )
      storeSaveSlots(updated)
      return updated
    })

    if (selectedSlot === slotNumber) {
      setSelectedSlot(null)
      setActiveGame(null)
    }
  }

  const handleSelectSlot = (slotNumber: number) => {
    const selectedSave = saves[slotNumber - 1]

    setSelectedSlot(slotNumber)

    if (selectedSave === null) {
      setScreen("setup")
      return
    }

    setActiveGame(selectedSave.game)
    setScreen(selectedSave.completed ? "results" : "game")
  }

  const handleSetupComplete = (character: CharacterSetup) => {
    if (selectedSlot === null) return

    const finances = character.scenario
    const firstEvent = getRandomEvent()

    const newGame: GameState = {
      profile: {
        characterName: character.name,
        startingAge: 20,
        occupation: finances.name,
        playStyle: character.mindset,
      },

      stats: {
        income: finances.income,
        bills: finances.bills,
        taxes: finances.taxes,
        debt: finances.debt,
        savings: finances.savings,
        investments: finances.investments,
        cash: finances.cash,
        stress: finances.stress,
      },

      balance: {
        health: 72,
        relationships: 68,
        morale: 65,
        smarts: 60,
      },

      score: 0,
      currentYear: 1,
      maxYears: 10,
      currentEvent: firstEvent,
      recentEventTitles: [firstEvent.title],
      history: [],
    }

    setActiveGame(newGame)
    saveGameToSelectedSlot(newGame)
    setScreen("game")
  }

  const handleGameChange = (updatedGame: GameState) => {
    setActiveGame(updatedGame)
    saveGameToSelectedSlot(updatedGame)
  }

  const handleGameFinish = (finishedGame: GameState) => {
    setActiveGame(finishedGame)
    saveGameToSelectedSlot(finishedGame, true)
    setScreen("results")
  }

  const handlePlayAgain = () => {
    if (!activeGame) return

    const firstEvent = getRandomEvent()
    const replay: GameState = {
      ...activeGame,
      score: 0,
      currentYear: 1,
      currentEvent: firstEvent,
      recentEventTitles: [firstEvent.title],
      history: [],
    }

    setActiveGame(replay)
    saveGameToSelectedSlot(replay)
    setScreen("game")
  }

  if (screen === "title") {
    return <TitleScreen onStart={() => setScreen("saves")} />
  }

  if (screen === "saves") {
    return (
      <SaveSlotScreen
        saves={saves}
        onSelectSlot={handleSelectSlot}
        onDeleteSlot={handleDeleteSlot}
        onBack={() => setScreen("title")}
      />
    )
  }

  if (screen === "setup") {
    return (
      <SetupScreen
        onContinue={handleSetupComplete}
        onBack={() => setScreen("saves")}
      />
    )
  }

  if (screen === "game" && activeGame) {
    return (
      <GameScreen
        game={activeGame}
        onChange={handleGameChange}
        onFinish={handleGameFinish}
        onBackToSaves={() => setScreen("saves")}
      />
    )
  }

  if (screen === "results" && activeGame) {
    return (
      <ResultsScreen
        game={activeGame}
        onBackToSaves={() => setScreen("saves")}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  return <TitleScreen onStart={() => setScreen("saves")} />
}