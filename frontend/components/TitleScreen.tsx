interface TitleScreenProps {
  onStart: () => void
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <main className="ll-screen flex flex-col items-center justify-center overflow-hidden px-6 py-10 text-center">
      <div className="relative z-10 flex flex-col items-center">
        <div className="ll-a1 mb-6">
          <div className="ll-bob">
            <span className="ll-brand">LIFE LEDGER</span>
          </div>
        </div>

        <p className="ll-a1 ll-eyebrow mb-3 uppercase">A Financial Life Simulator</p>

        <h1 className="ll-a2 ll-h1 max-w-2xl">Your story starts here</h1>

        <p className="ll-a3 mt-5 max-w-md text-pretty text-sm font-semibold leading-relaxed sm:text-base">
          Ten years. Hundreds of decisions. One financial future.
        </p>

        <button type="button" onClick={onStart} className="ll-a4 ll-btn-primary mt-10">
          {"Start Game >"}
        </button>
      </div>

      <footer className="ll-eyebrow absolute bottom-5 z-10 opacity-70">
        Build your legacy, one choice at a time.
      </footer>
    </main>
  )
}
