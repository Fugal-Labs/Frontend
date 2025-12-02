export default function About() {
  const features = [
    {
      title: "Community",
      description:
        "Join a vibrant network of college developers passionate about building and learning together.",
      icon: "👥",
    },
    {
      title: "Hackathons",
      description:
        "Participate in high-impact hackathons designed to challenge your skills and creativity.",
      icon: "💻",
    },
    {
      title: "Learning",
      description:
        "Access resources, workshops, and mentorship to accelerate your development journey.",
      icon: "📚",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            About <span className="text-[#ff2c2c]">Fugal Labs</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#bbbbbb] max-w-3xl mx-auto leading-relaxed px-2">
            Fugal Labs is a dev-first social platform empowering college
            developers to connect, collaborate, and create. We&apos;re currently
            in our hackathon organizing phase, bringing together the brightest
            minds to build innovative solutions and foster a culture of learning
            and growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-[#ff2c2c]/20 hover:border-[#ff2c2c]/50 transition-all hover:scale-105 active:scale-100 text-center sm:text-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-[#bbbbbb] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
