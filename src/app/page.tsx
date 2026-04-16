"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BatteryCharging,
  BriefcaseBusiness,
  Cable,
  ChevronDown,
  Disc3,
  Gamepad2,
  Package,
  ShieldCheck,
  Truck,
  ToyBrick,
} from "lucide-react";
import { HeroModelLabel } from "../components/hero-model-label";
import { OfferCountdown } from "../components/offer-countdown";
import { ComparisonVideo } from "../components/comparison-video";
import heroBackgroundV2 from "../../bgv2.jpg";
import sectionImage from "../../BG02S02.jpg";
import flyingDroneImage from "../../dronevoador.png";
import heroBackgroundNew from "../../S01BGNEW.jpg";
import mavic3ProImage from "../../DJI Mavic 3 Pro.png";
import mavic4ProImage from "../../DJI Mavic 4 Pro.png";

const heroSlides = [
  {
    id: "mavic-main",
    backgroundImage: `url(${heroBackgroundNew.src})`,
    backgroundPosition: "52% center",
    mobileBackgroundPosition: "52% center",
    extraTopVignette: false,
  },
  {
    id: "mavic-sensor",
    backgroundImage: `
      linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 24%, rgba(0,0,0,0) 52%),
      linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.34) 100%),
      url(${heroBackgroundV2.src})
    `,
    backgroundPosition: "center",
    mobileBackgroundPosition: "45% 34%",
    extraTopVignette: true,
  },
] as const;

const kitItems = [
  {
    icon: ToyBrick,
    title: "DJI Mavic Drone (3 Pro or 4 Pro)",
  },
  {
    icon: Gamepad2,
    title: "Smart remote controller",
  },
  {
    icon: BatteryCharging,
    title: "1 long-lasting battery",
  },
  {
    icon: Disc3,
    title: "Extra propellers and guards",
  },
  {
    icon: Cable,
    title: "Charging cables",
  },
  {
    icon: BriefcaseBusiness,
    title: "Premium bag + integrated gimbal",
  },
] as const;

const modelKitTopics = [
  {
    icon: Gamepad2,
    label: "Controller",
  },
  {
    icon: BriefcaseBusiness,
    label: "Bag",
  },
  {
    icon: Disc3,
    label: "Propellers",
  },
  {
    icon: ShieldCheck,
    label: "Guards",
  },
  {
    icon: Cable,
    label: "Cables",
  },
  {
    icon: BatteryCharging,
    label: "Battery",
  },
] as const;

const faqItems = [
  {
    q: "How long does delivery take?",
    a: "Shipping is free and the average delivery time is 7 to 15 business days, depending on your location.",
  },
  {
    q: "Why is the price so low?",
    a: "With the launch of DJI's new global lineup, current-generation inventory is being cleared out. We use direct distributor agreements to offer prices below market value.",
  },
  {
    q: "Can I return it if I do not like it?",
    a: "Yes. You have 30 days to return the product at no cost and receive a full refund, no questions asked.",
  },
  {
    q: "What is the difference between the Mavic 3 Pro and 4 Pro?",
    a: "The Mavic 4 Pro has a flight range of up to 41 km (vs. 28 km), charges 3 batteries in 90 min (vs. 210 min), and includes an upgraded image sensor with higher resolution.",
  },
] as const;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (revealElements.length === 0) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => {
        element.dataset.visible = "true";
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.28,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-black text-[var(--foreground)]">
      <OfferCountdown />
      <section className="relative isolate overflow-hidden bg-black">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={slide.id}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "opacity-100" : "opacity-0"
              } bg-[position:var(--bg-mobile-position)] md:bg-[position:var(--bg-desktop-position)]`}
              style={{
                backgroundImage: slide.backgroundImage,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                ["--bg-mobile-position" as string]: slide.mobileBackgroundPosition,
                ["--bg-desktop-position" as string]: slide.backgroundPosition,
              }}
            />
          );
        })}
        {heroSlides.map((slide, index) => {
          const isActive = index === activeSlide;

          if (!slide.extraTopVignette) {
            return null;
          }

          return (
            <div
              key={`${slide.id}-top-vignette`}
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-32 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:h-40 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.16) 44%, rgba(0,0,0,0) 100%)",
              }}
            />
          );
        })}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.1)_42%,rgba(0,0,0,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/55 to-transparent" />

        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-between px-6 pb-5 pt-24 text-center sm:px-8 sm:pb-10 sm:pt-24 lg:px-14 lg:pb-12 lg:pt-22">
          <div className="mx-auto flex max-w-[880px] flex-col items-center space-y-5">
            <HeroModelLabel activeIndex={activeSlide} />

            <div className="space-y-5">
              <h1 className="mx-auto max-w-[18ch] text-[clamp(2.35rem,5vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.05em] text-white">
                Complete DJI Drone Kit at a ridiculous price.
              </h1>

              <p className="mx-auto max-w-[38ch] text-sm leading-6 text-white/72 sm:text-[15px] sm:leading-7">
                With the launch of the new global lineup, older inventory is now
                being released.
              </p>
            </div>
          </div>

          <div className="pointer-events-none h-[clamp(9rem,22vh,24rem)] shrink-0 md:h-[clamp(15rem,34vh,24rem)]" />

          <div className="mx-auto flex max-w-[860px] flex-col items-center gap-5 pb-[60px] text-center md:pb-0">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/64">
              BAG, PROPELLERS, GUARDS, CABLES AND BATTERY.
            </div>

            <a
              href="#choose-model"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--dji-orange-soft)_0%,var(--dji-orange)_100%)] px-8 text-[13px] font-semibold text-black transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px"
            >
              GET MY DRONE $97
            </a>

            <div className="flex items-center justify-center gap-2 pt-1">
              {heroSlides.map((slide, index) => {
                const isActive = index === activeSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Go to image ${index + 1}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                      isActive
                        ? "w-8 bg-white/88"
                        : "w-2.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-6 px-6 pb-10 pt-0 sm:px-8 md:gap-12 md:py-18 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:px-14">
          <div className="relative z-0 overflow-visible rounded-[28px] scale-[1.14] origin-top lg:scale-[1.15] lg:origin-left">
            <Image
              src={sectionImage}
              alt="DJI Mavic kit items"
              className="h-auto w-full object-contain"
              unoptimized
              quality={100}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 58vw"
            />
            <div className="pointer-events-none absolute inset-x-[12%] top-[1%] z-30 animate-drone-float md:inset-x-[14%] md:top-[-3%] lg:inset-x-[25%] lg:top-[8%]">
              <Image
                src={flyingDroneImage}
                alt=""
                aria-hidden="true"
                className="h-auto w-full object-contain"
                unoptimized
                quality={100}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 72vw, 44vw"
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center lg:justify-start lg:pl-6 xl:pl-10">
            <div className="max-w-[620px] space-y-7 text-center lg:text-left">
              <h2
                data-reveal="text"
                className="bg-[linear-gradient(135deg,var(--dji-orange-soft)_0%,var(--dji-orange)_100%)] bg-clip-text text-[clamp(2rem,3.6vw,3.5rem)] font-medium leading-[0.96] tracking-[-0.045em] text-transparent"
              >
                What Comes in the Kit
              </h2>

              <p
                data-reveal="text"
                className="mx-auto max-w-[48ch] text-base leading-7 text-white/72 sm:text-[17px] lg:mx-0"
                style={{ transitionDelay: "90ms" }}
              >
                You receive a complete bundle designed to come out of the box and
                fly with ease from the very first use.
              </p>

              <div className="space-y-3">
                {kitItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      data-reveal="card"
                      className="flex items-center gap-4 rounded-[22px] border border-white/6 bg-white/[0.025] px-4 py-3 backdrop-blur-[2px]"
                      style={{ transitionDelay: `${140 + index * 65}ms` }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.045] text-white/82">
                        <Icon size={18} strokeWidth={1.7} />
                      </div>

                      <div>
                        <h3 className="m-0 text-[15px] font-medium leading-[1.2] text-white sm:text-base">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                data-reveal="text"
                href="#choose-model"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--dji-orange-soft)_0%,var(--dji-orange)_100%)] px-8 text-[13px] font-semibold text-black transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px"
                style={{ transitionDelay: "560ms" }}
              >
                GET MY DRONE $97
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-black py-20 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-14">
          <div>
            <ComparisonVideo />
          </div>

          <div
            data-reveal="text"
            className="relative z-10 mx-auto -mt-14 max-w-[680px] text-center md:-mt-24"
          >
            <h2 className="text-[clamp(2rem,4.2vw,3.8rem)] font-medium leading-[0.95] tracking-[-0.045em] text-white">
              <span className="bg-[linear-gradient(135deg,var(--dji-orange-soft)_0%,var(--dji-orange)_100%)] bg-clip-text text-transparent">
                Comparison
              </span>{" "}
              between the DJI Mavic 4 Pro and 3 Pro
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-base leading-relaxed text-white/56 sm:text-lg">
              The new-generation leap in range and charging.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
            {/* Flight Range */}
            <div
              data-reveal="card"
              className="rounded-[24px] border border-white/[0.06] bg-white/[0.025] p-6 sm:p-8"
              style={{ transitionDelay: "90ms" }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/38">
                Flight Range
              </p>

              <div className="mt-7 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-white/56">Mavic 4 Pro</span>
                  <span className="text-[1.5rem] font-medium leading-none tracking-[-0.03em] text-[#ff9c43]">
                    up to 41km
                  </span>
                </div>
                <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--dji-orange)_0%,var(--dji-orange-soft)_100%)]"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-white/56">Mavic 3 Pro</span>
                  <span className="text-[1.25rem] font-medium leading-none tracking-[-0.03em] text-white/80">
                    up to 28km
                  </span>
                </div>
                <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-white/20"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>
            </div>

            {/* Charging Time (3 Batteries) */}
            <div
              data-reveal="card"
              className="rounded-[24px] border border-white/[0.06] bg-white/[0.025] p-6 sm:p-8"
              style={{ transitionDelay: "170ms" }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/38">
                Charging Time (3 Batteries)
              </p>

              <div className="mt-7 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-white/56">Mavic 4 Pro</span>
                  <span className="text-[1.5rem] font-medium leading-none tracking-[-0.03em] text-[#ff9c43]">
                    90 min
                  </span>
                </div>
                <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--dji-orange)_0%,var(--dji-orange-soft)_100%)]"
                    style={{ width: "43%" }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-white/56">Mavic 3 Pro</span>
                  <span className="text-[1.25rem] font-medium leading-none tracking-[-0.03em] text-white/80">
                    210 min
                  </span>
                </div>
                <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-white/20"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Charging (1 Battery) */}
            <div
              data-reveal="card"
              className="rounded-[24px] border border-white/[0.06] bg-white/[0.025] p-6 sm:p-8"
              style={{ transitionDelay: "250ms" }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/38">
                Charging (1 Battery)
              </p>

              <div className="mt-7 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-white/56">Mavic 4 Pro</span>
                  <span className="text-[1.5rem] font-medium leading-none tracking-[-0.03em] text-[#ff9c43]">
                    51 min
                  </span>
                </div>
                <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--dji-orange)_0%,var(--dji-orange-soft)_100%)]"
                    style={{ width: "73%" }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-white/56">Mavic 3 Pro</span>
                  <span className="text-[1.25rem] font-medium leading-none tracking-[-0.03em] text-white/80">
                    70 min
                  </span>
                </div>
                <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-white/20"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Model */}
      <section id="choose-model" className="scroll-mt-12 bg-[#0e0e0f] py-20 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="text-[clamp(2rem,4.2vw,3.8rem)] font-medium leading-[0.95] tracking-[-0.045em] text-white">
              Choose Your Model
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-base leading-relaxed text-white/50 sm:text-lg">
              Complete kit ready to fly. Free shipping.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-[960px] items-stretch gap-6 md:mt-20 md:grid-cols-2">
            {/* Mavic 3 Pro Card */}
            <div className="group relative flex flex-col rounded-[28px] border border-white/[0.06] bg-[#141415] transition-colors hover:border-white/10">
              <div className="relative -mx-10 -mt-16 flex h-[260px] items-center justify-center px-2 sm:-mx-16 sm:-mt-20 md:h-[285px]">
                <Image
                  src={mavic3ProImage}
                  alt="DJI Mavic 3 Pro"
                  className="h-auto w-full max-w-[455px] object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.56)] transition-transform duration-500 group-hover:scale-105 md:max-w-[510px]"
                  unoptimized
                  quality={100}
                />
              </div>

              <div className="flex flex-1 flex-col space-y-5 p-6 sm:p-8">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/36">
                    Kit Fly More
                  </p>
                  <h3 className="mt-1 text-xl font-medium tracking-[-0.02em] text-white">
                    DJI Mavic 3 Pro
                  </h3>
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/34">
                    Complete Kit
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {modelKitTopics.map((topic) => {
                      const Icon = topic.icon;

                      return (
                        <div
                          key={topic.label}
                          className="flex items-center gap-2.5"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.045] text-white/82">
                            <Icon size={16} strokeWidth={1.7} />
                          </span>
                          <span className="text-[13px] text-white/52">{topic.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.045] text-white/82">
                      <Truck size={16} strokeWidth={1.7} />
                    </span>
                    <span className="text-[13px] text-white/52">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.045] text-white/82">
                      <Package size={16} strokeWidth={1.7} />
                    </span>
                    <span className="text-[13px] text-white/52">Limited Stock</span>
                  </div>
                </div>

                <div className="flex-1" />

                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold tracking-[-0.03em] text-white">$97</span>
                </div>

                <a
                  href="#"
                  className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--dji-orange-soft)_0%,var(--dji-orange)_100%)] text-[13px] font-semibold text-black transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px"
                >
                  GET MY DRONE
                </a>
              </div>
            </div>

            {/* Mavic 4 Pro Card */}
            <div className="group relative flex flex-col rounded-[28px] border border-[#e05d26]/20 bg-[#141415] transition-colors hover:border-[#e05d26]/30">
              <div className="relative -mx-8 -mt-12 flex h-[250px] items-center justify-center px-4 sm:-mx-12 sm:-mt-16 md:h-[270px]">
                <Image
                  src={mavic4ProImage}
                  alt="DJI Mavic 4 Pro"
                  className="h-auto w-full max-w-[340px] object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.56)] transition-transform duration-500 group-hover:scale-105 md:max-w-[375px]"
                  unoptimized
                  quality={100}
                />
              </div>

              <div className="flex flex-1 flex-col space-y-5 p-6 sm:p-8">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/36">
                    Kit Fly More
                  </p>
                  <h3 className="mt-1 text-xl font-medium tracking-[-0.02em] text-white">
                    DJI Mavic 4 Pro
                  </h3>
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/34">
                    Complete Kit
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {modelKitTopics.map((topic) => {
                      const Icon = topic.icon;

                      return (
                        <div
                          key={topic.label}
                          className="flex items-center gap-2.5"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.045] text-[#e05d26]/80">
                            <Icon size={16} strokeWidth={1.7} />
                          </span>
                          <span className="text-[13px] text-white/52">{topic.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.045] text-[#e05d26]/80">
                      <Truck size={16} strokeWidth={1.7} />
                    </span>
                    <span className="text-[13px] text-white/52">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.045] text-[#e05d26]/80">
                      <Package size={16} strokeWidth={1.7} />
                    </span>
                    <span className="text-[13px] text-white/52">Limited Stock</span>
                  </div>
                </div>

                <div className="flex-1" />

                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold tracking-[-0.03em] text-white">$137</span>
                </div>

                <a
                  href="#"
                  className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--dji-orange-soft)_0%,var(--dji-orange)_100%)] text-[13px] font-semibold text-black transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px"
                >
                  GET MY DRONE
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-20 max-w-[1440px] px-6 sm:px-8 md:mt-32 lg:px-14">
          <div className="h-px bg-white/[0.06]" />
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-[740px] px-6 pt-20 sm:px-8 md:pt-32">
          <h2 className="text-center text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[0.96] tracking-[-0.04em] text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 divide-y divide-white/[0.06]">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;

              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15px] font-medium leading-snug text-white/88 sm:text-base">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className={`shrink-0 text-white/32 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-white/48">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0e0e0f] py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-14">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logodji.svg"
                alt="DJI"
                className="h-5 w-auto opacity-40"
              />
              <span className="text-sm text-white/28">|</span>
              <span className="text-sm text-white/40">Mavic Pro Series</span>
            </div>

            <div className="flex items-center gap-6 text-[13px] text-white/32">
              <a href="#" className="transition-colors hover:text-white/56">Privacy</a>
              <a href="#" className="transition-colors hover:text-white/56">Terms</a>
              <a href="#" className="transition-colors hover:text-white/56">Contact</a>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] leading-relaxed text-white/18 md:text-left">
            This site is not affiliated with or endorsed by DJI. Product names and images are used for identification purposes only.
          </p>
        </div>
      </footer>

    </main>
  );
}
