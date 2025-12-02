"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    github: "",
    track: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          college: "",
          year: "",
          github: "",
          track: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-16 sm:py-20 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Register <span className="text-[#ff2c2c]">Now</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#bbbbbb] px-2">
            Fill out the form below to secure your spot at the hackathon!
          </p>
        </div>

        <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-[#ff2c2c]/30">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-white font-semibold mb-2 text-sm sm:text-base"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#ff2c2c]/30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ff2c2c] transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-white font-semibold mb-2 text-sm sm:text-base"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#ff2c2c]/30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ff2c2c] transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-white font-semibold mb-2 text-sm sm:text-base"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#ff2c2c]/30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ff2c2c] transition-colors"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label
                  htmlFor="college"
                  className="block text-white font-semibold mb-2 text-sm sm:text-base"
                >
                  College/University *
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#ff2c2c]/30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ff2c2c] transition-colors"
                  placeholder="Your College"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-white font-semibold mb-2 text-sm sm:text-base"
                >
                  Year of Study *
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#ff2c2c]/30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ff2c2c] transition-colors"
                  placeholder="2nd Year"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-white font-semibold mb-2 text-sm sm:text-base"
              >
                GitHub / Portfolio URL
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#ff2c2c]/30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ff2c2c] transition-colors"
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div>
              <label
                htmlFor="track"
                className="block text-white font-semibold mb-2 text-sm sm:text-base"
              >
                Preferred Track *
              </label>
              <select
                id="track"
                name="track"
                value={formData.track}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-[#ff2c2c]/30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ff2c2c] transition-colors"
              >
                <option value="">Select a track</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="ai">AI/ML</option>
                <option value="blockchain">Blockchain</option>
                <option value="iot">IoT</option>
                <option value="open">Open Innovation</option>
              </select>
            </div>

            {submitStatus === "success" && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base">
                Registration successful! We&apos;ll contact you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ff2c2c] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-[#e62828] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#ff2c2c]/50"
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
