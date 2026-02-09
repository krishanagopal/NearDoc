
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">

      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_100%] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Book Doctor Appointments
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            In Minutes, Not Hours
          </span>
        </h1>

        <p className="mt-20 max-w-2xl mx-auto text-lg text-neutral-400">
          A modern healthcare platform designed for speed, reliability, and trust — helping patients discover verified doctors, manage appointments seamlessly, and access care without friction. Built with performance and simplicity at its core, so healthcare works the way it should.
        </p>

        <div className="mt-15 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-white px-7 py-3 font-medium text-black transition hover:bg-neutral-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg border border-neutral-700 px-7 py-3 text-white transition hover:bg-neutral-800"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Grid — transparent tiles, hover border */}
      <section className="relative z-10 pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                title: "Built for you",
                desc: "Built for patients, doctors, dreamers, thinkers and doers.",
              },
              {
                title: "Ease of use",
                desc: "It's as easy as using an Apple, and as expensive as buying one.",
              },
              {
                title: "Pricing like no other",
                desc: "Our prices are best in the market. No cap, no lock, no credit card required.",
              },
              {
                title: "100% Uptime guarantee",
                desc: "We just cannot be taken down by anyone.",
              },
              {
                title: "Multi-tenant Architecture",
                desc: "You can simply show appointments instead of standing in a long queue.",
              },
              {
                title: "24/7 Customer Support",
                desc: "We are available a 100% of the time. At least our AI agents are.",
              },
              {
                title: "Money back guarantee",
                desc: "If you do not like service, we will convince you to like us.",
              },
              {
                title: "And everything else",
                desc: "I just ran out of copy.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  px-8
                  py-16
                  min-h-[450px]
                  bg-neutral-950/60
                  backdrop-blur-sm
                  border border-transparent
                  transition-all duration-300
                  hover:border-neutral-800/20
                  hover:bg-neutral-950/80
                "
              >
                <h3 className="text-lg font-semibold mb-5">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed max-w-[90%]">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Healthcare, reimagined for modern patients and providers
        </h2>

        <p className="mt-6 mb-12 mx-auto max-w-3xl text-center text-md text-neutral-400 leading-relaxed">
          A secure, reliable platform built to simplify doctor discovery, appointment scheduling, and care management — trusted by patients and medical professionals to deliver a seamless healthcare experience every day.
        </p>

        <Link
          to="/register"
          className="inline-block rounded-xl bg-gradient-to-r from-blue-900 to-cyan-500 px-10 py-4 font-medium text-white transition hover:opacity-90"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default Landing;








