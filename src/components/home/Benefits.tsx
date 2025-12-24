export default function Benefits() {
  const benefits = [
    {
      title: "Networking",
      description:
        "Connect with like-minded developers, mentors, and industry professionals.",
      icon: "🤝",
    },
    {
      title: "Real Projects",
      description:
        "Work on meaningful projects that solve real-world problems and build your portfolio.",
      icon: "🚀",
    },
    {
      title: "Rewards",
      description:
        "Win exciting prizes, swag, and recognition for your innovative solutions.",
      icon: "🏆",
    },
    {
      title: "Recognition",
      description:
        "Showcase your skills and get noticed by top companies and recruiters.",
      icon: "⭐",
    },
    {
      title: "Community",
      description:
        "Become part of an inclusive community that supports growth and collaboration.",
      icon: "🌟",
    },
    {
      title: "Learning",
      description:
        "Access workshops, talks, and resources to enhance your technical skills.",
      icon: "📖",
    },
  ];

  return (
    <section id="benefits" className="py-16 sm:py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Why <span className="text-primary-red">Join Us?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto px-2">
            Discover the benefits of being part of the Fugal Labs community and
            taking your development journey to the next level.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card p-6 sm:p-8 rounded-2xl border border-primary-red/20 hover:border-primary-red transition-all hover:scale-105 active:scale-100 hover:shadow-2xl hover:shadow-primary-red/20 text-center sm:text-left"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
