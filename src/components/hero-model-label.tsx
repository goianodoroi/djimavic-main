"use client";

const DEFAULT_MODELS = [
  "KIT DJI MAVIC 4 PRO FLY",
  "KIT DJI MAVIC 3 PRO FLY",
] as const;

export function HeroModelLabel({
  activeIndex = 0,
  models = DEFAULT_MODELS,
}: {
  activeIndex?: number;
  models?: readonly string[];
}) {
  return (
    <div
      aria-label={models[activeIndex]}
      className="relative h-[1.4em] w-full max-w-[30ch] overflow-visible px-4"
    >
      {models.map((model, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={model}
            className={`absolute inset-0 flex items-center justify-center whitespace-nowrap text-center text-[12px] font-semibold uppercase tracking-[0.42em] text-white/78 transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[13px] ${
              isActive
                ? "translate-y-0 scale-100 blur-0 opacity-100"
                : "translate-y-[0.18em] scale-[0.985] blur-[8px] opacity-0"
            }`}
          >
            {model}
          </div>
        );
      })}
    </div>
  );
}
