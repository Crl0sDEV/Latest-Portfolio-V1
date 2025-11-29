export default function Footer() {
  return (
    <footer className="w-full py-6 text-center bg-[#000000] text-zinc-500">
      <p className="text-sm">
          © {new Date().getFullYear()} Carlos Miguel Sandrino. All rights reserved.
      </p>
    </footer>
  );
}