import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const roles = [
  "Fresh Graduate",
  "Full Stack Developer",
  "React Enthusiast",
  "Entry-Level Developer",
];

const HeroSection = () => {
  const { isDark } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, roleIndex]);

  const resumeUrl =
    "https://drive.google.com/file/d/1KgqqiOjLNxX_nIPEOiloH2MJKJis5rvb/view?usp=sharing";

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className={`min-h-screen flex items-center relative overflow-hidden ${
        isDark ? "bg-dark-bg" : "bg-light-bg"
      }`}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isDark ? "#2A2A2A" : "#E4E4E7"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow Effect */}
      <div
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "linear-gradient(135deg, #007AFF, #FF3B30)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                isDark
                  ? "bg-dark-surface border border-dark-border"
                  : "bg-light-surface border border-light-border"
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span
                className={`font-mono text-sm ${isDark ? "text-dark-muted" : "text-light-muted"}`}
              >
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-4 ${
                isDark ? "text-dark-text" : "text-light-text"
              }`}
            >
              Sriram
              <br />
              <span className="gradient-text">Divi</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <span
                className={`font-mono text-xl md:text-2xl ${isDark ? "text-dark-muted" : "text-light-muted"}`}
              >
                {"> "}
                {displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="download-resume-btn"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:glow-secondary transition-all"
              >
                <Download size={20} />
                Download Resume
              </a>
              <a
                href="#contact"
                data-testid="hire-me-btn"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  isDark
                    ? "bg-dark-surface border border-dark-border text-dark-text hover:border-primary"
                    : "bg-light-surface border border-light-border text-light-text hover:border-primary"
                }`}
              >
                Hire Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/SriramDivi1",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sriram-divi-dev",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:sriramdivi716@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${label.toLowerCase()}`}
                  className={`p-3 rounded-full transition-all ${
                    isDark
                      ? "bg-dark-surface text-dark-muted hover:text-primary hover:bg-dark-border"
                      : "bg-light-surface text-light-muted hover:text-primary hover:bg-light-border"
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Abstract Shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-80 h-80">
              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-2 border-secondary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-2 border-primary/50 rounded-full"
              />
              
              {/* Revolving Technology Icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {/* Git Icon */}
                <motion.div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#F05032">
                    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.317.605-.406V8.835c-.217-.088-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
                  </svg>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {/* React Icon */}
                <motion.div
                  className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-3 rounded-full ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  style={{ rotate: -360 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  title="React"
                >
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
                    <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
                    <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/>
                    <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/>
                  </svg>
                  {/* Placeholder fallback */}
                  <div className="sr-only">React</div>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {/* Node.js Icon */}
                <motion.div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 rounded-full ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  style={{ rotate: -360 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  title="Node.js"
                >
                  <svg width="24" height="24" viewBox="0 0 256 289" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M127.999 0C126.101 0 124.204 0.521 122.576 1.562L13.691 66.906C10.435 68.988 8.312 72.516 8.312 76.344V212.656C8.312 216.484 10.435 220.012 13.691 222.094L122.576 287.438C124.204 288.479 126.101 289 127.999 289C129.897 289 131.794 288.479 133.422 287.438L242.307 222.094C245.563 220.012 247.686 216.484 247.686 212.656V76.344C247.686 72.516 245.563 68.988 242.307 66.906L133.422 1.562C131.794 0.521 129.897 0 127.999 0Z" fill="#539E43"/>
                    <path d="M242.307 222.094L133.422 287.438C131.794 288.479 129.897 289 127.999 289V0C129.897 0 131.794 0.521 133.422 1.562L242.307 66.906C245.563 68.988 247.686 72.516 247.686 76.344V212.656C247.686 216.484 245.563 220.012 242.307 222.094Z" fill="#333333" fillOpacity="0.2"/>
                  </svg>
                  {/* Placeholder fallback */}
                  <div className="sr-only">Node.js</div>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {/* JavaScript Icon */}
                <motion.div
                  className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  style={{ rotate: -360 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#F7DF1E">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                  </svg>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {/* VS Code Icon */}
                <motion.div
                  className={`absolute top-[15%] right-[15%] translate-x-1/2 -translate-y-1/2 p-3 rounded-full ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  style={{ rotate: -360 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#007ACC">
                    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                  </svg>
                </motion.div>
              </motion.div>
              
              {/* GitHub Icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <motion.div
                  className={`absolute bottom-[15%] left-[15%] -translate-x-1/2 translate-y-1/2 p-3 rounded-full ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  style={{ rotate: -360 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={isDark ? "#fff" : "#181717"}>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.div>
              </motion.div>
              
              {/* Center glow */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse opacity-60 blur-xl" />
              <div className="absolute inset-20 rounded-full bg-gradient-to-br from-primary to-secondary" />
              
              {/* Revolving Code symbols */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <motion.span
                  className="absolute top-[10%] left-[25%] -translate-x-1/2 -translate-y-1/2 font-mono text-2xl text-primary"
                  style={{ rotate: -360 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {"</>"}
                </motion.span>
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <motion.span
                  className="absolute bottom-[10%] right-[25%] translate-x-1/2 translate-y-1/2 font-mono text-2xl text-secondary"
                  style={{ rotate: -360 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {"{ }"}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            data-testid="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={isDark ? "text-dark-muted" : "text-light-muted"}
          >
            <ChevronDown size={32} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
