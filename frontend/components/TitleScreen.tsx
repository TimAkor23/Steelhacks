interface TitleScreenProps {
  onStart: () => void
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 text-center">
      <style>{`
        @keyframes ll-rise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ll-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ll-drift {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
        }
        @keyframes ll-dash {
          from { stroke-dashoffset: 340; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes ll-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .ll-anim-1 { opacity: 0; animation: ll-rise 0.7s ease-out 0.1s forwards; }
        .ll-anim-2 { opacity: 0; animation: ll-rise 0.7s ease-out 0.25s forwards; }
        .ll-anim-3 { opacity: 0; animation: ll-rise 0.7s ease-out 0.4s forwards; }
        .ll-anim-4 { opacity: 0; animation: ll-rise 0.7s ease-out 0.55s forwards; }
        .ll-anim-footer { opacity: 0; animation: ll-fade 1s ease-out 0.9s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ll-anim-1, .ll-anim-2, .ll-anim-3, .ll-anim-4, .ll-anim-footer { animation: none; opacity: 1; }
          .ll-ecg-line { animation: none !important; stroke-dashoffset: 0 !important; }
          .ll-drift { animation: none !important; }
        }
      `}</style>

      {/* Layered background: gradient wash, grid, timeline path, glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(2,44,34,0.5),_transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="ll-drift pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl"
        style={{ animation: "ll-drift 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="ll-drift pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl"
        style={{ animation: "ll-drift 11s ease-in-out infinite reverse" }}
      />

      {/* Ascending timeline path drawn with SVG */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-40"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 90 L60 80 L110 84 L160 60 L210 66 L260 40 L320 46 L400 12"
          fill="none"
          stroke="rgba(52,211,153,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ll-ecg-line"
          style={{ strokeDasharray: 340, strokeDashoffset: 340, animation: "ll-dash 2.4s ease-out 0.3s forwards" }}
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        {/* Custom LifeLine logo mark: an ECG / heartbeat line in a ring */}
        <div
          className="ll-anim-1 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
          style={{ animation: "ll-pulse 3s ease-in-out infinite" }}
        >
          <svg viewBox="0 0 48 24" className="h-8 w-9" aria-hidden="true">
            <path
              d="M2 12 H12 L16 4 L22 20 L27 12 H34 L37 8 L40 12 H46"
              fill="none"
              stroke="rgb(52,211,153)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="ll-anim-1 mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
          Financial Life Simulator
        </span>

        <h1 className="ll-anim-2 text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_30px_rgba(16,185,129,0.25)] sm:text-7xl md:text-8xl">
          Life<span className="text-emerald-400">Line</span>
        </h1>

        <p className="ll-anim-3 mt-6 max-w-md text-balance text-lg text-slate-300 sm:text-xl">
          Ten years. Hundreds of Decisions. One financial future.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="ll-anim-4 group relative mt-12 overflow-hidden rounded-xl bg-emerald-500 px-10 py-4 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-400/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50 active:translate-y-0 active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Game
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        </button>
      </div>

      <footer className="ll-anim-footer absolute bottom-6 text-xs tracking-wide text-slate-500">
        Build your legacy, one choice at a time.
      </footer>
    </main>
  )
}

