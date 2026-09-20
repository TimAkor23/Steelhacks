"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import CharacterAvatar from "./CharacterAvatar";
import type { CharacterAppearance } from "../lib/types";

// Original SVG character art is drawn below; fonts are from Google Fonts.
const skinTones = [
  { name: "Light", color: "#f4d0b1" },
  { name: "Warm", color: "#e7b58d" },
  { name: "Tan", color: "#d99d73" },
  { name: "Brown", color: "#a76c49" },
  { name: "Deep", color: "#70452f" },
];
const hairstyles = {
  male: ["Short", "Long", "Curls"],
  female: ["Bob", "Long", "Ponytail", "Curls"],
} as const;
const outfits = {
  top: [
    { name: "Ocean tee", color: "#2f80ed" },
    { name: "Berry tee", color: "#b54769" },
    { name: "Sunshine tee", color: "#efbb35" },
    { name: "Forest tee", color: "#348459" },
  ],
  bottom: [
    { name: "Blue jeans", color: "#324d83" },
    { name: "Sand trousers", color: "#b58c59" },
    { name: "Plum trousers", color: "#714a89" },
  ],
  shoes: [
    { name: "White sneakers", color: "#fff8e8" },
    { name: "Red sneakers", color: "#d64e46" },
    { name: "Dark sneakers", color: "#25354d" },
  ],
};
type ClothingPart = keyof typeof outfits;
type Mindset = "saver" | "builder" | "risk";
const mindsets: { id: Mindset; name: string; description: string }[] = [
  { id: "saver", name: "Planner", description: "More cash and savings, lower income, expenses, debt, investments, and stress." },
  { id: "builder", name: "Builder", description: "A balanced start: moderate growth in income, savings, and investments." },
  { id: "risk", name: "Risk taker", description: "Higher income and investments, less cash and savings, more expenses, debt, and stress." },
];
// Fictional starting profiles, not predictions of real financial behavior.
const mindsetModifiers = {
  saver: { emergencyFund: 1.5, cash: 1.2, savings: 1.5, debt: 0.75, investments: 0.8, income: 0.95, bills: 0.9, stress: 0.75 },
  builder: { emergencyFund: 1.1, cash: 1.1, savings: 1.2, debt: 0.9, investments: 1.4, income: 1.05, bills: 1.0, stress: 1.0 },
  risk: { emergencyFund: 0.6, cash: 0.8, savings: 0.7, debt: 1.25, investments: 2.0, income: 1.15, bills: 1.1, stress: 1.3 },
};
// Fictional monthly take-home income and personal expenses; balances are one-time amounts.
// Taxes are already included in take-home income. Keep taxes: 0 for the existing payload.
const scenarios = [
  { name: "Student", description: "You’re balancing school and a limited income. Budget for books, food, transportation, and everyday expenses.", income: 1200, bills: 1000, taxes: 0, debt: 200, savings: 400, emergencyFund: 200, investments: 100, cash: 250, stress: 30 },
  { name: "Business Owner", description: "You’re running a business. Cover operating costs while making enough to support yourself. Income shown is your take-home pay after business costs and taxes; expenses are personal costs.", income: 3000, bills: 2500, taxes: 0, debt: 400, savings: 1500, emergencyFund: 1000, investments: 1000, cash: 700, stress: 60 },
  { name: "Blue Collar Worker", description: "You work a hands-on job. Balance everyday bills, transportation, work gear, and unexpected expenses.", income: 3600, bills: 3200, taxes: 150, debt: 150, savings: 50, emergencyFund: 600, investments: 500, cash: 500, stress: 55 },
  { name: "Employee", description: "You earn a regular paycheck. Balance monthly bills, savings, and your longer-term goals.", income: 3200, bills: 2400, taxes: 0, debt: 60, savings: 500, emergencyFund: 400, investments: 300, cash: 800, stress: 30 },
];

export type CharacterSetup = CharacterAppearance & {
  name: string;
  mindset: Mindset;
  scenario: (typeof scenarios)[number] & { incomePeriod: "monthly"; incomeBasis: "take-home"; billsPeriod: "monthly" };
};

type SetupScreenProps = {
  /** Parent client component should open SaveSlotScreen with this draft. */
  onContinue?: (character: CharacterSetup) => void;
  onBack?: () => void;
};

export default function SetupScreen({ onContinue, onBack }: SetupScreenProps) {
  const viewportRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ width: 1050, scale: 1 });

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // A hidden or not-yet-laid-out container must never collapse the screen.
        if (viewport.clientWidth <= 0 || viewport.clientHeight <= 0 || content.scrollHeight <= 0) return;
        const width = Math.max(800, viewport.clientWidth);
        const scale = Math.min(1, viewport.clientWidth / width,
          viewport.clientHeight / Math.max(1, content.scrollHeight));
        setFit((previous) => previous.width === width && Math.abs(previous.scale - scale) < 0.001
          ? previous : { width, scale });
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(content);
    measure();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  const [gender, setGender] = useState<CharacterSetup["gender"]>("male");
  const [skinIndex, setSkinIndex] = useState(2);
  const [hairChoices, setHairChoices] = useState({ male: 0, female: 0 });
  const hairstyle = hairstyles[gender][hairChoices[gender]];
  const skinTone = skinTones[skinIndex];
  const hairShape = hairstyle;
  const [name, setName] = useState("");
  const [clothes, setClothes] = useState({ top: 0, bottom: 0, shoes: 0 });
  const [mindset, setMindset] = useState<Mindset>("saver");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [error, setError] = useState("");
  const top = outfits.top[clothes.top];
  const bottom = outfits.bottom[clothes.bottom];
  const shoes = outfits.shoes[clothes.shoes];
  // Always recalculate from the base situation so switching choices never compounds changes.
  const scenario: CharacterSetup["scenario"] = {
    ...scenarios[scenarioIndex],
    incomePeriod: "monthly",
    incomeBasis: "take-home",
    billsPeriod: "monthly",
  };
  const modifiers = mindsetModifiers[mindset];
  for (const key of Object.keys(modifiers) as (keyof typeof modifiers)[]) {
    scenario[key] = Math.round(scenarios[scenarioIndex][key] * modifiers[key]);
  }

  if (mindset === "risk") {
    const scenarioName = scenarios[scenarioIndex].name;
    const reducedRiskScenarios: Record<string, { debt?: number; bills?: number; investments?: number; stress?: number }> = {
      "Business Owner": { debt: 0.9, bills: 1.0, investments: 1.3, stress: 1.1 },
      "Blue Collar Worker": { debt: 0.8, bills: 0.95, investments: 1.1, stress: 0.95 },
    };

    const reduction = reducedRiskScenarios[scenarioName];
    if (reduction) {
      if (reduction.debt !== undefined) scenario.debt = Math.round(scenarios[scenarioIndex].debt * reduction.debt);
      if (reduction.bills !== undefined) scenario.bills = Math.round(scenarios[scenarioIndex].bills * reduction.bills);
      if (reduction.investments !== undefined) scenario.investments = Math.round(scenarios[scenarioIndex].investments * reduction.investments);
      if (reduction.stress !== undefined) scenario.stress = Math.min(100, Math.max(0, Math.round(scenarios[scenarioIndex].stress * reduction.stress)));
    }
  }

  if (scenarios[scenarioIndex].name === "Blue Collar Worker") {
    scenario.debt = Math.max(150, scenario.debt);
  }
  scenario.stress = Math.min(100, Math.max(0, scenario.stress));
  const money = (value: number) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(value);

  function cycleHair(direction: number) {
    setHairChoices((current) => ({ ...current, [gender]: (current[gender] + direction + hairstyles[gender].length) % hairstyles[gender].length }));
  }

  function cycle(part: ClothingPart, direction: number) {
    setClothes((current) => ({ ...current,
      [part]: (current[part] + direction + outfits[part].length) % outfits[part].length,
    }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError("Give your character a name to continue."); return; }
    setError("");
    onContinue?.({ name: name.trim(), gender, skinTone, hairstyle, clothing: { top, bottom, shoes }, mindset, scenario });
  }

  return (
    <section ref={viewportRef} className="setup-viewport" aria-labelledby="setup-heading">
      <div ref={contentRef} className="setup" style={{ width: fit.width, transform: `translateX(-50%) scale(${fit.scale})` }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;500;600;700;800&display=swap" />
      <header className="heading">
        <span className="brand">LIFE LEDGER</span>
        <p className="eyebrow">YOUR STORY STARTS HERE</p>
        <h1 id="setup-heading">Create your character</h1>
        <p>A new look. A starting story. A future you get to build.</p>
      </header>
      <form onSubmit={submit}>
        <div className="columns">
          <section className="panel appearance" aria-labelledby="appearance-heading">
            <h2 id="appearance-heading"><span className="number">01</span> Choose your look</h2>
            <fieldset className="gender">
              <legend>Character</legend>
              {(["male", "female"] as const).map((value) => (
                <label className={gender === value ? "selected" : ""} key={value}>
                  <input type="radio" name="gender" value={value} checked={gender === value} onChange={() => setGender(value)} />
                  {value === "male" ? "Male" : "Female"}
                </label>
              ))}
            </fieldset>
            <div className="character-stage">
              <div className="scenery" aria-hidden="true">
                <div className="sun" />
                <svg className="landscape" viewBox="0 0 600 320" preserveAspectRatio="none" focusable="false">
                  {/* Original layered landscape: distant ridges, sunlit slopes, and shaded foreground. */}
                  <path d="M0 205C55 185 80 116 145 145S231 225 308 177S405 126 457 159S550 180 600 133V320H0Z" fill="#8bd6ae" />
                  <path d="M0 238C65 235 87 168 145 179S237 259 327 221S453 161 518 189S564 219 600 195V320H0Z" fill="#5fbf75" />
                  <path d="M0 235C67 146 129 190 191 244C112 222 57 249 0 264Z" fill="#a8df68" />
                  <path d="M337 251C420 220 475 138 600 217V274C491 218 424 260 337 251Z" fill="#9cdb60" />
                  <path d="M0 267C100 233 183 254 258 272S449 245 600 259V320H0Z" fill="#72be48" />
                  <path d="M0 294C125 274 226 298 308 283S504 273 600 287V320H0Z" fill="#48a34d" />
                  <path d="M0 277C65 263 118 265 171 275M400 277C471 265 526 266 596 279" stroke="#b5e979" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <g>
                    <path d="M53 248L57 166H68L73 248Z" fill="#916342" />
                    <path d="M61 241L64 183M63 202L43 183M65 187L83 166" stroke="#bb8c52" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M26 181C3 170 12 147 27 141C18 120 39 104 57 113C73 91 97 114 91 129C114 137 111 160 94 167C96 190 73 199 59 185C45 197 28 193 26 181Z" fill="#248c53" />
                    <path d="M27 147C17 128 39 115 53 123C65 105 88 117 83 138C99 138 101 156 87 162C75 154 66 158 58 169C47 153 35 165 27 147Z" fill="#5bb94d" />
                    <path d="M35 135Q42 126 52 133M62 123Q72 115 79 129" fill="none" stroke="#a3dd69" strokeWidth="5" strokeLinecap="round" />
                  </g>
                  <g transform="translate(545 59) scale(.72)">
                    <path d="M-9 262L-6 154H6L10 262Z" fill="#916342" />
                    <path d="M-43 187C-59 167-43 145-31 148C-44 125-17 107-5 119C10 100 35 119 29 138C53 139 57 164 39 175C39 196 16 205 2 191C-17 208-42 204-43 187Z" fill="#238b50" />
                    <path d="M-31 150C-39 136-17 118-5 133C12 116 32 140 18 151C35 148 40 169 24 179C10 168-4 180-8 181C-13 168-35 172-31 150Z" fill="#6dc451" />
                  </g>
                  <g stroke="#297e42" strokeWidth="2" strokeLinecap="round" fill="none">
                    <path d="M24 297L20 289M24 297L29 287M103 286L99 279M103 286L109 277M472 298L466 289M472 298L477 286M578 283L573 277M578 283L584 274" />
                  </g>
                  <g fill="#fff4c4"><circle cx="116" cy="279" r="3" /><circle cx="496" cy="284" r="3" /><circle cx="30" cy="269" r="2" /></g>
                </svg>
                <span className="scene-coin coin-left">●</span><span className="scene-coin coin-right">●</span>
                <span className="flower flower-left">✿</span><span className="flower flower-right">✿</span>
                <div className="standing-platform" />
              </div>
              <span className="cloud cloud-one" aria-hidden="true">☁</span>
              <span className="cloud cloud-two" aria-hidden="true">☁</span>
              <div className="character">
                <CharacterAvatar appearance={{ gender, skinTone, hairstyle, clothing: { top, bottom, shoes } }} />
              </div>
              <div className="clothing-row hair">
                <button type="button" aria-label="Previous hairstyle" onClick={() => cycleHair(-1)}>◀</button>
                <span className="clothing-label">Hair</span>
                <button type="button" aria-label="Next hairstyle" onClick={() => cycleHair(1)}>▶</button>
              </div>
              {(["top", "bottom", "shoes"] as const).map((part) => (
                <div className={`clothing-row ${part}`} key={part}>
                  <button type="button" aria-label={`Previous ${part}`} onClick={() => cycle(part, -1)}>◀</button>
                  <span className="clothing-label">{part}<small>{outfits[part][clothes[part]].name}</small></span>
                  <button type="button" aria-label={`Next ${part}`} onClick={() => cycle(part, 1)}>▶</button>
                </div>
              ))}
              <div className="grass" aria-hidden="true" />
            </div>
            <p className="outfit-note" aria-live="polite">{hairShape} hair · {top.name} · {bottom.name} · {shoes.name}</p>
            <div className="appearance-options">
              <fieldset className="skin-picker">
                <legend>Skin tone</legend>
                <div className="swatches">
                  {skinTones.map((tone, index) => (
                    <label className="skin-option" key={tone.name}>
                      <input type="radio" name="skin-tone" aria-label={`${tone.name} skin tone`} checked={skinIndex === index} onChange={() => setSkinIndex(index)} />
                      <span className="skin-swatch" style={{ backgroundColor: tone.color }} aria-hidden="true" />
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <label className="name-label" htmlFor="character-name">Your character name</label>
            <input id="character-name" className="name-input" value={name} onChange={(event) => { setName(event.target.value); setError(""); }} maxLength={18} required placeholder="Enter a name or nickname" autoComplete="off" aria-invalid={!!error} aria-describedby="name-help name-error" />
            <p id="name-help" className="hint">Up to 18 characters. A nickname is perfect.</p>
            <p id="name-error" role="alert" className="error">{error}</p>
          </section>

          <section className="panel story" aria-labelledby="story-heading">
            <h2 id="story-heading"><span className="number">02</span> Your money story</h2>
            <fieldset className="mindsets">
              <legend>Choose your money mindset</legend>
              {mindsets.map((option) => (
                <label className={`mindset ${mindset === option.id ? "selected" : ""}`} key={option.id}>
                  <input type="radio" name="mindset" value={option.id} checked={mindset === option.id} onChange={() => setMindset(option.id)} />
                  <span><strong>{option.name}</strong><small>{option.description}</small></span>
                </label>
              ))}
            </fieldset>
            <label className="scenario-label" htmlFor="scenario">Starting situation</label>
            <select id="scenario" aria-describedby="scenario-description" value={scenarioIndex} onChange={(event) => setScenarioIndex(Number(event.target.value))}>
              {scenarios.map((item, index) => <option value={index} key={item.name}>{item.name}</option>)}
            </select>
            <div id="scenario-description" className="scenario-description" aria-live="polite">
              {/* Reserve space for the longest story at the current width; only the selected one is visible. */}
              {scenarios.map((item, index) => (
                <span key={item.name} className={index === scenarioIndex ? "" : "inactive-description"} aria-hidden={index !== scenarioIndex}>
                  {item.description}
                </span>
              ))}
            </div>
            <div className="stats" aria-label="Starting financial stats">
              {([ ["Cash", scenario.cash], ["Savings", scenario.savings], ["Debt", scenario.debt], ["Investments", scenario.investments], ["Take-home income / month", scenario.income], ["Expenses / month", scenario.bills], ["Emergency Fund", scenario.emergencyFund] ] as const).map(([label, value]) => (
                <div className="stat" key={label}><span>{label}</span><strong>{money(value)}</strong></div>
              ))}
              <div className="stat"><span>Stress</span><strong>{scenario.stress}/100</strong></div>
            </div>
            <p className="hint">Fictional game values. Income is after taxes; expenses are monthly. Your situation and mindset together set every starting stat. Emergency funds cover surprises; savings cover planned goals. Clothes are just for looks.</p>
          </section>
        </div>
        <footer className="footer">
          {onBack && <button className="back" type="button" onClick={onBack}>← Back to save slots</button>}
          <div className="continue-wrap">
            <p>Next up: choose a save slot for your character.</p>
            <button className="continue" type="submit" disabled={!onContinue}>Continue to game →</button>
            {!onContinue && <p className="hint">Character preview ready. Save-slot navigation is not connected yet.</p>}
          </div>
        </footer>
      </form>
      </div>
      <style jsx>{`
        .setup-viewport { position:relative; width:100%; height:100dvh; overflow:hidden; flex-shrink:0; background:linear-gradient(180deg,#169ee8 0%,#68dbff 68%,#b4ee73 100%); }
        .setup { position:absolute; top:0; left:50%; transform-origin:top center; min-height:100dvh; display:flex; flex-direction:column; padding:20px 18px 22px; background:transparent; color:#17324f; font-family:Inter,Arial,sans-serif; }
        .setup * { box-sizing:border-box; }
        .heading, form { width:100%; max-width:none; margin:0 auto; }
        form { display:flex; flex-direction:column; flex:1; }
        .appearance { display:flex; flex-direction:column; }
        .heading { text-align:center; margin-bottom:30px; }
        .brand { display:inline-block; background:#e9232c; border:2px solid #fff; border-radius:8px; box-shadow:0 3px 0 #971b25; color:#fff; padding:10px 14px; font-size:10px; letter-spacing:2px; }
        .brand,h1,h2,button,.eyebrow { font-family:'Press Start 2P',monospace; }
        .eyebrow { font-size:9px; margin:24px 0 12px; line-height:1.8; }
        h1 { color:#fff; text-shadow:2px 2px 0 #17324f,0 4px 0 #17324f; font-size:clamp(20px,3vw,30px); line-height:1.6; margin:0 0 12px; }
        h2 { display:flex; align-items:center; gap:12px; font-size:12px; line-height:1.8; margin:0 0 20px; }
        .number { color:#fff; background:#e9232c; border-radius:5px; padding:9px; }
        .columns { flex:1; display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .panel { min-width:0; background:linear-gradient(155deg,#fffef4,#fff3b0); border:4px solid #17324f; border-radius:14px; padding:24px; box-shadow:0 9px 0 #17324f; }
        fieldset { border:0; padding:0; margin:0; min-width:0; }
        legend,.name-label,.scenario-label { font-weight:800; margin-bottom:10px; display:block; }
        .gender { display:flex; gap:10px; margin-bottom:16px; }
        .gender label { flex:1; display:flex; align-items:center; justify-content:center; gap:9px; padding:12px; background:#fffef5; border:2px solid #65a62d; border-radius:7px; cursor:pointer; }
        input[type=radio] { accent-color:#167a2b; width:18px; height:18px; flex-shrink:0; }
        label.selected { background:#dcf79b; border-color:#167a2b; box-shadow:inset 4px 0 0 #36b83c; }
        .character-stage { flex:1; min-height:350px; height:350px; background:linear-gradient(#23b9f3,#8fe9ff); position:relative; overflow:hidden; border:3px solid #17324f; border-radius:8px; }
        .scenery { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
        .sun { position:absolute; width:45px; height:45px; border-radius:50%; top:18px; right:18%; background:#fff178; box-shadow:0 0 0 9px #fff17830; }
        .landscape { position:absolute; inset:0; width:100%; height:100%; }
        .scene-coin { position:absolute; top:98px; color:#ffe640; font-size:30px; line-height:1; text-shadow:2px 2px 0 #a56a16,-1px -1px 0 #fff6a5; animation:coin-bob 3s ease-in-out infinite; }
        .coin-left { left:7%; } .coin-right { right:7%; animation-delay:1.5s; }
        .flower { position:absolute; bottom:24px; font-size:24px; line-height:1; color:#ff70a8; text-shadow:1px 1px 0 #9b3156; }
        .flower-left { left:16%; } .flower-right { right:15%; color:#fff064; }
        .standing-platform { position:absolute; top:290px; left:50%; transform:translateX(-50%); width:135px; height:17px; background:#c78b45; border-top:6px solid #7be138; border-radius:50% 50% 6px 6px; box-shadow:0 3px 0 #946131; }
        @keyframes coin-bob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
        @media(prefers-reduced-motion:reduce) { .scene-coin { animation:none; } }
        .character { position:absolute; height:280px; width:200px; left:50%; transform:translateX(-50%); top:24px; z-index:1; }
        .cloud { position:absolute; color:white; font-size:64px; line-height:1; }
        .cloud-one { top:10px; left:2%; } .cloud-two { right:4%; top:48px; font-size:40px; }
        .clothing-row { position:absolute; left:50%; width:224px; transform:translateX(-50%); display:flex; justify-content:space-between; align-items:center; z-index:2; }
        .hair { top:53px; } .top { top:165px; } .bottom { top:222px; } .shoes { top:258px; }
        button { cursor:pointer; border:3px solid #17324f; border-radius:7px; color:#17324f; background:#ffe33e; font-size:10px; line-height:1.8; }
        .clothing-row button { display:flex; align-items:center; justify-content:center; width:46px; height:30px; padding:0; border:0; border-radius:0; background:transparent; font-family:Arial,sans-serif; font-size:30px; line-height:1; color:#17324f; box-shadow:none; }
        .clothing-row button:hover:not(:disabled) { background:transparent; color:#b81723; }
        .clothing-label { position:absolute; right:calc(100% + 8px); top:50%; transform:translateY(-50%); white-space:nowrap; padding:0; border:0; color:#fff044; background:transparent; box-shadow:none; text-shadow:1px 1px 0 #17324f,-1px -1px 0 #17324f,1px -1px 0 #17324f,-1px 1px 0 #17324f; line-height:14px; font-size:10px; font-weight:800; text-transform:uppercase; }
        .clothing-label small { display:none; }
        .grass { position:absolute; bottom:0; height:27px; width:100%; background:#d59443; border-top:12px solid #5cce24; }
        .outfit-note { font-size:12px; text-align:center; min-height:36px; margin:16px 0; }
        .appearance-options { display:grid; grid-template-columns:1fr; align-items:start; gap:12px; margin:0 0 10px; }
        .skin-picker legend { display:block; font-size:13px; font-weight:800; margin-bottom:6px; }
        .swatches { display:flex; gap:8px; flex-wrap:wrap; }
        .skin-option { position:relative; width:28px; height:28px; cursor:pointer; }
        .skin-option input { position:absolute; width:100%; height:100%; margin:0; opacity:0; cursor:pointer; }
        .skin-swatch { display:block; width:28px; height:28px; border:2px solid #17324f; border-radius:50%; pointer-events:none; }
        .skin-option input:checked + .skin-swatch { outline:3px solid #167a2b; outline-offset:2px; }
        .skin-option input:focus-visible + .skin-swatch { outline:3px solid #714a89; outline-offset:3px; }
        .name-input,select { width:100%; padding:13px; background:#fffdf4; border:2px solid #17324f; border-radius:7px; font:inherit; color:#17324f; }
        .hint { font-size:12px; line-height:1.6; margin-top:10px; }
        .error { color:#a12130; font-size:13px; }
        .mindset { display:flex; gap:12px; align-items:center; padding:13px; border:2px solid #65a62d; background:#fffef5; border-radius:8px; margin-bottom:10px; cursor:pointer; }
        .mindset strong { display:block; font-size:16px; } .mindset small { display:block; font-size:12px; line-height:1.5; margin-top:4px; }
        .scenario-label { margin-top:20px; }
        .scenario-description { display:grid; margin:10px 0 0; padding:12px; border-left:4px solid #23a73b; background:#fffef5; border-radius:4px; font-size:13px; line-height:1.6; }
        .scenario-description span { grid-area:1 / 1; }
        .inactive-description { visibility:hidden; }
        .stats { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-top:16px; }
        .stat { background:#ffe365; padding:10px 12px; border-radius:6px; }
        .stat span { display:block; font-size:11px; margin-bottom:3px; } .stat strong { font-size:18px; }
        .footer { display:flex; justify-content:space-between; align-items:center; gap:24px; margin-top:30px; }
        .back { padding:12px 16px; } .continue-wrap { margin-left:auto; text-align:right; }
        .continue-wrap p { font-size:14px; font-weight:700; margin:0 0 10px; }
        .continue { color:#fff; background:#dc202b; box-shadow:0 5px 0 #8f1720; padding:18px 24px; font-size:16px; }
        .continue-wrap .hint { margin-top:14px; }
        button:hover:not(:disabled) { background:#fff17b; } .continue:hover:not(:disabled) { background:#b81723; } button:active:not(:disabled) { transform:translateY(2px); box-shadow:none; }
        button:disabled { opacity:.55; cursor:not-allowed; }
        button:focus-visible,input:focus-visible,select:focus-visible { outline:3px solid #714a89; outline-offset:4px; }
        /* Compact layout is scaled as a whole to fit the viewport without scrolling. */
        @media(min-width:761px) and (max-height:900px) {
          .setup { padding:14px 20px 22px; }
          .heading, form { max-width:none; }
          .heading { margin-bottom:14px; }
          .brand { padding:6px 10px; font-size:9px; }
          .eyebrow { margin:8px 0 4px; font-size:8px; }
          h1 { font-size:20px; line-height:1.5; margin-bottom:4px; }
          .heading > p:last-child { margin:0; font-size:13px; }
          .columns { gap:18px; }
          .panel { padding:14px; box-shadow:0 5px 0 #17324f; }
          h2 { margin-bottom:10px; font-size:10px; gap:8px; }
          .number { padding:6px; }
          legend,.name-label,.scenario-label { font-size:13px; margin-bottom:6px; }
          .gender { margin-bottom:10px; }
          .gender label { padding:6px; font-size:14px; }
          .character-stage { min-height:280px; height:280px; }
          .standing-platform { top:229px; width:115px; }
          .character { height:230px; width:164px; top:8px; }
          .clothing-row { width:196px; }
          .hair { top:29px; } .top { top:121px; } .bottom { top:167px; } .shoes { top:201px; }
          .grass { height:14px; border-top-width:7px; }
          .outfit-note { min-height:0; margin:8px 0; font-size:11px; }
          .name-input,select { padding:8px 10px; font-size:14px; }
          .hint { font-size:11px; line-height:1.4; margin:6px 0 0; }
          .error:empty { display:none; }
          .mindset { padding:8px 10px; margin-bottom:6px; gap:8px; }
          .mindset strong { font-size:14px; }
          .mindset small { font-size:12px; line-height:1.35; margin-top:2px; }
          .scenario-label { margin-top:10px; }
          .scenario-description { font-size:12px; line-height:1.4; padding:8px; margin-top:6px; }
          .stats { grid-template-columns:repeat(4,minmax(0,1fr)); gap:6px; margin-top:10px; }
          .stat { padding:7px; }
          .stat span { font-size:10px; line-height:1.3; overflow-wrap:break-word; }
          .stat strong { font-size:15px; }
          .footer { margin-top:16px; gap:12px; }
          .continue-wrap p { font-size:12px; margin-bottom:6px; }
          .continue { padding:12px 16px; font-size:12px; }
          .continue-wrap .hint { margin-top:8px; }
        }
        @media(max-width:760px) { .columns { grid-template-columns:1fr; } .setup { padding:24px 14px 36px; } .panel { padding:18px; } .footer { flex-direction:column; align-items:stretch; } .continue-wrap { margin:0; text-align:center; } .continue { width:100%; } }
      `}</style>
    </section>
  );
}
