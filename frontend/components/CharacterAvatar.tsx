import type { CharacterAppearance } from "../lib/types"

// Older saves predate appearance storage; render a character without discarding their progress.
export const DEFAULT_APPEARANCE: CharacterAppearance = {
  gender: "male",
  skinTone: { name: "Tan", color: "#d99d73" },
  hairstyle: "Short",
  clothing: {
    top: { name: "Ocean tee", color: "#2f80ed" },
    bottom: { name: "Blue jeans", color: "#324d83" },
    shoes: { name: "White sneakers", color: "#fff8e8" },
  },
}

export default function CharacterAvatar({ appearance = DEFAULT_APPEARANCE, className }: {
  appearance?: CharacterAppearance
  className?: string
}) {
  const { gender, skinTone, hairstyle: hairShape, clothing: { top, bottom, shoes } } = appearance
  const hairBack = hairShape === "Bob" ? "M27 12H73V55H62V48H38V55H25V22Z"
    : hairShape === "Ponytail" ? "M30 12H69V18H82V26H89V52H79V32H70V45H28V22Z"
    : hairShape === "Long" ? "M27 12H73V59H65V67H25V22Z"
    : hairShape === "Curls" ? (gender === "female"
      ? "M23 23V14H30V8H40V11H48V6H58V10H69V15H77V29H81V44H77V60H68V65H60V53H35V63H25V55H20V39H23Z"
      : "M23 23V14H30V8H40V11H48V6H58V10H69V15H77V29H73V46H27V29H23Z")
    : "M30 12H70V46H27V22Z";

  return (
              <svg viewBox="0 0 100 140" className={className} style={{ display: "block", width: "100%", height: "100%" }} role="img" aria-label={`${gender} character with ${skinTone.name.toLowerCase()} skin and ${hairShape.toLowerCase()} hair wearing ${top.name}, ${bottom.name}, and ${shoes.name}`} shapeRendering="crispEdges">
                <ellipse cx="50" cy="133" rx="29" ry="4" fill="#17324f" opacity=".18" />
                <path d={hairBack} fill="#51372e" />
                <path d="M33 25H67V51H60V58H40V51H33Z" fill={skinTone.color} />
                <path d={hairShape === "Curls" ? "M29 21H71V29H63V33H55V28H47V32H39V28H29Z" : "M33 24H67V29H57V21H33Z"} fill="#51372e" />
                {hairShape === "Ponytail" && <path d="M74 20H82V25H74Z" fill="#ed4675" />}
                <path d="M39 34H44V39H39ZM57 34H62V39H57Z" fill="#17324f" />
                <path d="M45 46H56V49H45Z" fill="#9d4e49" />
                <path d="M40 54H60V65H40Z" fill={skinTone.color} />
                <path d="M29 61H71V71H79V88H67V95H33V88H21V71H29Z" fill={top.color} />
                <path d="M44 61H56V66H44Z" fill={skinTone.color} />
                <path d="M21 85H30V99H21ZM70 85H79V99H70Z" fill={skinTone.color} />
                <path d="M33 94H67V119H54V104H46V119H33Z" fill={bottom.color} />
                <path d="M33 117H46V128H27V121H33ZM54 117H67V121H73V128H54Z" fill={shoes.color} />
                <path d="M27 128H46V132H27ZM54 128H73V132H54Z" fill="#17324f" />
                <path d="M33 122H42V125H33ZM58 122H67V125H58Z" fill="#8ca1b3" />
              </svg>
  )
}
