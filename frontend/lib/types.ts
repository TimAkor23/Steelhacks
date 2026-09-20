export interface CharacterAppearance {
  gender: "male" | "female"
  skinTone: { name: string; color: string }
  hairstyle: "Short" | "Long" | "Curls" | "Bob" | "Ponytail"
  clothing: Record<"top" | "bottom" | "shoes", { name: string; color: string }>
}

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

export interface LifeBalance {
  health: number
  relationships: number
  morale: number
  smarts: number
}

export type ChoiceEffects = Partial<GameStats & LifeBalance> & {
  score?: number
}

export interface GameChoice {
  text: string
  icon?: string
  effects: ChoiceEffects
}

export interface LifeEvent {
  title: string
  description: string
  icon?: string
  choices: GameChoice[]
}

export interface StarterScenario extends GameStats {
  label: string
}

export interface LifeProfile {
  characterName: string
  startingAge: number
  occupation: string
  playStyle: PlayStyle
  appearance?: CharacterAppearance
}

export interface GameState {
  profile: LifeProfile
  stats: GameStats
  balance: LifeBalance
  score: number
  currentYear: number
  maxYears: number
  pathStep?: number
  furthestStep?: number
  currentEvent: LifeEvent
  recentEventTitles: string[]
  history: string[]
}

export interface SaveData {
  characterName: string
  occupation: string
  age: number
  currentYear: number
  netWorth: number
  completed?: boolean
  game: GameState
}

export type SaveSlot = SaveData | null