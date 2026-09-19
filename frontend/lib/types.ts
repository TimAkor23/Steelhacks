export interface SaveData {
  characterName: string;
  age: number;
  occupation: string;
  currentYear: number;
  netWorth: number;
}

export type SaveSlot = SaveData | null;