import Reveal from "../../components/Reveal";
import EmailCard from "../../components/EmailCard";
import SocialLinks from "../../components/SocialLinks";

export const metadata = {
  title: "Contact Me | Carlos Miguel Sandrino",
  description: "Get in touch with Carlos Miguel Sandrino for collaborations.",
};

export default function Contact() {
  return (
    <section className="relative w-full min-h-screen py-24 lg:py-16 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center overflow-hidden">

      {/* Soft, neutral glowing background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--muted)] rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="relative z-10 text-center mb-16 max-w-2xl">
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">Connect</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[var(--muted-foreground)] text-lg leading-relaxed font-light">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </Reveal>
      </div>
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 pb-20">
        
        <div className="h-full">
           <EmailCard email="sandrinocarlosmiguel@gmail.com" />
        </div>

        <div className="h-full flex flex-col">
           <SocialLinks />
        </div>

      </div>
    </section>
  );
}