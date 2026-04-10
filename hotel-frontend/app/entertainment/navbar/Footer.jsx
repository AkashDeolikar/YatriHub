import { Facebook, Instagram, Twitter, Youtube, Globe } from "lucide-react";
import Link from "next/link";
import { FiCompass } from "react-icons/fi";

export default function Footer() {
  const links = [
    "FAQ", "Help Center", "Account", "Media Center",
    "Investor Relations", "Jobs", "Ways to Watch", "Terms of Use",
    "Privacy", "Cookie Preferences", "Corporate Information", "Contact Us"
  ];

  return (
    <footer className="text-gray-500 bg-black pt-20 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Social Icons */}
        <div className="flex gap-6 mb-8 text-white">
          <Facebook className="cursor-pointer hover:text-red-600 transition-colors" size={24} />
          <Instagram className="cursor-pointer hover:text-red-600 transition-colors" size={24} />
          <Twitter className="cursor-pointer hover:text-red-600 transition-colors" size={24} />
          <Youtube className="cursor-pointer hover:text-red-600 transition-colors" size={24} />
        </div>

        <p className="mb-6 hover:underline cursor-pointer text-sm transition-all">
          Questions? Contact us.
        </p>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-8 text-[13px]">
          {links.map((link) => (
            <Link
              key={link}
              href="#"
              className="hover:text-white hover:underline transition-all duration-200"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Language Selector */}
        <div className="mt-10 inline-flex items-center gap-2 border border-gray-600 px-4 py-2 rounded-sm text-sm hover:border-white hover:text-white transition-colors cursor-pointer group">
          <Globe size={16} className="text-gray-400 group-hover:text-white" />
          <span>English</span>
        </div>

        {/* Branding & Copyright */}
        <div className="mt-12 flex flex-col items-start gap-6">
          <Link href="/" className="group flex flex-col gap-2">
            {/* Logo Row */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Yatri<span className="text-teal-400">Hub</span>
              </span>
            </div>

            {/* Media Stream Tag Row */}
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-4 bg-red-600" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 italic">
                Media Stream
              </span>
              <span className="h-[1px] w-4 bg-red-600" />
            </div>
          </Link>

          <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-medium">
            © 2026 YatriHub Entertainment Global
          </p>
        </div>
      </div>
    </footer>
  );
}