export default function Footer() {
  const socialLinks = [
    { name: "GitHub", url: "#", icon: "💻" },
    { name: "Twitter", url: "#", icon: "🐦" },
    { name: "LinkedIn", url: "#", icon: "💼" },
    { name: "Discord", url: "#", icon: "💬" },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#ff2c2c]/20 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="logo-placeholder mb-3 sm:mb-4 text-sm font-bold text-white">
              FUGAL LABS
            </div>
            <p className="text-[#bbbbbb] leading-relaxed text-sm sm:text-base">
              Empowering college developers to build, learn, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-[#bbbbbb] hover:text-[#ff2c2c] transition-colors text-sm sm:text-base"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#hackathon"
                  className="text-[#bbbbbb] hover:text-[#ff2c2c] transition-colors text-sm sm:text-base"
                >
                  Hackathon
                </a>
              </li>
              <li>
                <a
                  href="#sponsors"
                  className="text-[#bbbbbb] hover:text-[#ff2c2c] transition-colors text-sm sm:text-base"
                >
                  Sponsors
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className="text-[#bbbbbb] hover:text-[#ff2c2c] transition-colors text-sm sm:text-base"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Connect With Us
            </h3>
            <p className="text-[#bbbbbb] mb-3 sm:mb-4 text-sm sm:text-base">
              <a
                href="mailto:contact&#64;fugallabs&#46;com"
                className="hover:text-[#ff2c2c] transition-colors break-all"
              >
                contact
                <span aria-hidden="true" style={{ display: "none" }}>
                  null
                </span>
                &#64;
                <span aria-hidden="true" style={{ display: "none" }}>
                  null
                </span>
                fugallabs&#46;com
              </a>
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-2xl hover:scale-110 transition-transform"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#ff2c2c]/20 pt-6 sm:pt-8 text-center">
          <p className="text-[#bbbbbb] text-xs sm:text-sm">
            © {new Date().getFullYear()} Fugal Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
