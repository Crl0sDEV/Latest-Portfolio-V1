import Reveal from "../../components/Reveal";
import EmailCard from "../../components/EmailCard";
import SocialLinks from "../../components/SocialLinks";

export const metadata = {
  title: "Contact Me | Carlos Miguel Sandrino",
  description: "Get in touch with Carlos Miguel Sandrino for collaborations.",
};

export default function Contact() {
  return (
    <section className="relative w-full min-h-screen py-24 lg:py-8 px-4 md:px-8 bg-black text-white flex flex-col items-center overflow-hidden">

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 text-center mb-16 max-w-2xl">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Let&apos;s <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">Connect</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-gray-400 text-lg leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </Reveal>
      </div>
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 pb-20">
        
        <div className="h-full">
           <EmailCard email="sandrinocarlosmiguel@gmail.com" />
        </div>

        <div className="h-full">
           <SocialLinks />
        </div>

      </div>
    </section>
  );
}