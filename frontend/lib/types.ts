export type PlayStyle = "saver" | "builder" | "risk"

export interface GameStats {
  income: number
  bills: number
  taxes: number
  debt: number
  savings: number
  investments: number
  cash: number
  stress: number
}



export interface ChoiceEffects extends Partial<GameStats> {
  score?: number
}

export interface GameChoice {
  text: string
  icon: string
  effects: ChoiceEffects
}

export interface LifeEvent {
  title: string
  description: string
  choices: GameChoice[]
}

export interface StarterScenario extends GameStats {
  label: string
}

export interface LifeProfile {
  characterName: string
  startingAge: number
  occupation: string
  annualSalary: number
  relationshipStatus: "single" | "relationship" | "married"
  children: number
  cash: number
  savings: number
  debt: number
  lifeGoal: string
}

export interface GameState {
  profile: LifeProfile
  stats: GameStats
  score: number
  currentYear: number
  maxYears: number
}

export interface SaveData {
  characterName: string
  occupation: string
  age: number
  currentYear: number
  netWorth: number
}

export type SaveSlot = SaveData | null
