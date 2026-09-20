import type { SaveSlot } from "../lib/types"

interface SaveSlotCardProps {
  slotNumber: number
  save: SaveSlot
  onSelect: (slotNumber: number) => void
  onDelete: (slotNumber: number) => void
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export default function SaveSlotCard({
  slotNumber,
  save,
  onSelect,
  onDelete,
}: SaveSlotCardProps) {
  const isEmpty = save === null

  return (
    <div className="ll-panel flex h-full flex-col p-4 text-left transition-transform duration-100 hover:-translate-y-1">
      <div className="mb-3 flex items-center justify-between">
        <span className="ll-number font-pixel inline-flex h-8 w-8 items-center justify-center text-[10px]">
          {slotNumber}
        </span>
        {!isEmpty && (
          <span className="ll-stat ll-eyebrow uppercase">Year {save.currentYear}</span>
        )}
      </div>

      {isEmpty ? (
        <button
          type="button"
          onClick={() => onSelect(slotNumber)}
          className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg py-8 text-center"
        >
          <span className="font-pixel flex h-12 w-12 items-center justify-center rounded-md border-4 border-dashed border-[#65a62d] text-xl text-[#167a2b]">
            +
          </span>
          <span className="font-pixel text-[11px] text-[#17324f]">New Life</span>
          <span className="text-xs font-semibold text-[#4c6a2a]">Start a fresh story</span>
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => onSelect(slotNumber)}
            className="flex flex-1 cursor-pointer flex-col rounded-md text-left"
          >
            <h3 className="font-pixel text-[13px] leading-relaxed text-[#17324f]">
              {save.characterName}
            </h3>
            <p className="mt-2 text-xs font-semibold text-[#5a5140]">
              {save.occupation} · Age {save.age}
            </p>

            <div className="mt-4 rounded-md border-2 border-[#17324f] bg-[#fffdf4] p-3">
              <p className="font-pixel uppercase text-[7px] tracking-wide text-[#8a7f66]">Net Worth</p>
              <p
                className={`font-pixel mt-1.5 text-sm ${
                  save.netWorth >= 0 ? "text-[#167a2b]" : "text-[#a12130]"
                }`}
              >
                {currency.format(save.netWorth)}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onDelete(slotNumber)}
            className="ll-btn mt-3 w-full !bg-[#f1e4e4] !text-[#a12130] hover:!bg-[#f7d6d6]"
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}
