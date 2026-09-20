import type { SaveSlot } from "./types"

const STORAGE_KEY = "life-ledger-save-slots"

export function loadSaveSlots(): SaveSlot[] {
	if (typeof window === "undefined") return [null, null, null]

	try {
		const stored = window.localStorage.getItem(STORAGE_KEY)
		const saves = stored ? JSON.parse(stored) : []

		if (!Array.isArray(saves)) return [null, null, null]

		return Array.from({ length: 3 }, (_, index) => saves[index] ?? null)
	} catch {
		return [null, null, null]
	}
}

export function storeSaveSlots(saves: SaveSlot[]) {
	if (typeof window === "undefined") return

	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saves))
}
