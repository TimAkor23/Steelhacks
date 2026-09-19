"use client";

import { useState } from "react";
import type { SaveSlot } from "../lib/types";
import TitleScreen from "../components/TitleScreen";
import SaveSlotScreen from "../components/SaveSlotScreen";

type Screen = "title" | "saves";

const INITIAL_SAVES: SaveSlot[] = [null, null, null];

export default function Page() {
  const [screen, setScreen] = useState<Screen>("title");
  const [saves, setSaves] = useState<SaveSlot[]>(INITIAL_SAVES);

  function handleDeleteSlot(slotNumber: number) {
    setSaves((previousSaves) =>
      previousSaves.map((save, index) =>
        index === slotNumber - 1 ? null : save
      )
    );
  }

  function handleSelectSlot(slotNumber: number) {
    console.log("Selected slot:", slotNumber);
  }

  if (screen === "title") {
    return <TitleScreen onStart={() => setScreen("saves")} />;
  }

  return (
    <SaveSlotScreen
      saves={saves}
      onSelectSlot={handleSelectSlot}
      onDeleteSlot={handleDeleteSlot}
      onBack={() => setScreen("title")}
    />
  );
}