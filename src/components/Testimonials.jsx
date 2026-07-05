"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Quote } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote: "Carlos didn't just build our capstone project, he engineered it to perfection. His deep understanding of Next.js and backend databases saved us weeks of development time. The system was robust, fast, and handled real-time data flawlessly.",
    author: "IT Capstone Group",
    role: "University Students"
  },
  {
    quote: "I needed a web application that could track our daily inventory and customer debts. The digital ledger he developed completely streamlined our operations. Very professional, always communicates clearly, and delivers exactly what is needed.",
    author: "Small Business Owner",
    role: "Retail Client"
  },
  {
    quote: "Working with him was an absolute pleasure. He transformed our vague requirements into a sleek, high-performing platform. The code quality is top-notch and the user interface he designed exceeded all our expectations.",
    author: "Freelance Client",
    role: "Startup Founder"
  }
];

function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-[var(--border)] bg-[var(--background)]/50 overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              var(--muted),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-20">{children}</div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full py-20 lg:py-32 px-6 overflow-hidden bg-[var(--background)]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">Feedback</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg font-light">
              Don't just take my word for it. Here is what people have to say about my work.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Reveal key={i} delay={0.1 * i} className="h-full">
              <SpotlightCard className="h-full p-8 md:p-10 flex flex-col justify-between backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                
                <div>
                  <Quote className="w-10 h-10 text-[var(--muted-foreground)]/30 mb-6 group-hover:text-[var(--foreground)]/50 transition-colors" />
                  <p className="text-[var(--muted-foreground)] font-light leading-relaxed mb-8 text-sm md:text-base">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center">
                    <span className="font-bold text-[var(--foreground)] text-xs">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--foreground)] text-sm">{testimonial.author}</h4>
                    <span className="text-xs text-[var(--muted-foreground)]">{testimonial.role}</span>
                  </div>
                </div>

              </SpotlightCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
