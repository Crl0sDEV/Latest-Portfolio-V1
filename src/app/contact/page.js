import Reveal from "../../components/Reveal";
import EmailCard from "../../components/EmailCard";
import SocialLinks from "../../components/SocialLinks";

export const metadata = {
  title: "Contact Me | Carlos Miguel Sandrino",
  description: "Get in touch with Carlos Miguel Sandrino for collaborations.",
};

export default function Contact() {
  return (
    <section className="relative w-full min-h-screen py-24 px-4 md:px-8 bg-black text-white flex flex-col items-center overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Text */}
      <div className="relative z-10 text-center mb-12">
        <Reveal>
          <h1 className="text-3xl font-bold mb-6">
            Let&apos;s <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Connect</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Open for freelance projects, collaborations, or just a tech chat.
            Feel free to reach out!
          </p>
        </Reveal>
      </div>

      {/* Main Grid Content */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pb-20">
        
        {/* Left Side: Email Card */}
        <EmailCard email="sandrinocarlosmiguel@gmail.com" />

        {/* Right Side: Social Links Grid */}
        <SocialLinks />

      </div>
    </section>
  );
}