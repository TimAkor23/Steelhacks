"use client"

import { useState } from "react"
import type { SaveData, SaveSlot } from "../lib/types"
import TitleScreen from "../components/TitleScreen"
import SaveSlotScreen from "../components/SaveSlotScreen"
import SetupScreen, { type CharacterSetup } from "../components/SetupScreen"

type Screen = "title" | "saves" | "setup"

const INITIAL_SAVES: SaveSlot[] = [null, null, null]

export default function Page() {
  const [screen, setScreen] = useState<Screen>("title")
  const [saves, setSaves] = useState<SaveSlot[]>(INITIAL_SAVES)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

  const handleDeleteSlot = (slotNumber: number) => {
    setSaves((prev) =>
      prev.map((save, index) => (index === slotNumber - 1 ? null : save)),
    )
  }

  const handleSelectSlot = (slotNumber: number) => {
    setSelectedSlot(slotNumber)

    if (saves[slotNumber - 1] === null) {
      setScreen("setup")
      return
    }

    // Occupied slots will open GameScreen when that screen is connected.
    console.log("Loading save:", saves[slotNumber - 1])
  }

  const handleSetupComplete = (character: CharacterSetup) => {
    if (selectedSlot === null) return

    const finances = character.scenario
    const newSave: SaveData = {
      characterName: character.name,
      age: 20,
      occupation: finances.name,
      currentYear: 1,
      netWorth:
        finances.cash +
        finances.savings +
        finances.investments -
        finances.debt,
    }

    setSaves((previous) =>
      previous.map((save, index) =>
        index === selectedSlot - 1 ? newSave : save,
      ),
    )

    // Temporary destination until GameScreen is connected.
    setScreen("saves")
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

  return (
    <SetupScreen
      onContinue={handleSetupComplete}
      onBack={() => setScreen("saves")}
    />
  )
}
