import React from "react";
import Reveal from "./Reveal";
import { Zap, ArrowRight } from "lucide-react";

export default function AutomationDemo() {
  return (
    <section className="relative w-full bg-[var(--background)] text-[var(--foreground)] py-32 px-6 flex flex-col items-center border-t border-[var(--border)] z-20 transition-colors duration-300">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left Side: Google Form Embed (Zigzag from Hero) */}
        <div className="w-full flex justify-center order-2 lg:order-1">
          <Reveal delay={0.2} className="w-full">
            <div className="w-full max-w-lg mx-auto bg-[var(--muted)]/10 rounded-[2rem] p-4 border border-[var(--border)] shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--foreground)]/5 to-[var(--background)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="w-full h-[600px] md:h-[650px] overflow-hidden rounded-2xl bg-[var(--background)] relative z-10 border border-[var(--border)]">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSeDySK2HWUMhcjrtsAXTlOm10j6GdGN7Au4t1cB5cFkdhM8dQ/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  className="w-full h-full border-0"
                  title="Automation Demo Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Instruction/Context */}
        <div className="w-full flex flex-col lg:items-start items-center text-center lg:text-left space-y-6 order-1 lg:order-2">
          <Reveal>
            <div className="mb-2 uppercase tracking-widest text-xs font-bold text-[var(--muted-foreground)]">
              Live Demonstration
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Need an Automated System? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">
                Test my live Lead Automation.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2} className="w-full">
            <div className="bg-[var(--muted)]/10 border border-[var(--border)] rounded-2xl p-8 max-w-lg mx-auto lg:mx-0 shadow-sm backdrop-blur-sm relative overflow-hidden group mt-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--muted)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col lg:items-start items-center">
                <p className="text-[var(--muted-foreground)] leading-relaxed font-light text-lg">
                  Fill out the form with your active email and a dummy project. Within 60 seconds, my automation workflow will log your entry and send a highly personalized confirmation email straight to your inbox.
                </p>
                <div className="mt-8 flex items-center gap-2 text-[var(--foreground)] font-medium">
                  <ArrowRight className="w-5 h-5 rotate-180 lg:rotate-180 hidden lg:block text-[var(--muted-foreground)]" />
                  <span>Go ahead, try it out on the left</span>
                  <ArrowRight className="w-5 h-5 rotate-90 lg:hidden text-[var(--muted-foreground)]" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
