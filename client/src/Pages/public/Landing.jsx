import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "Are the doctors verified?",
    a: "Absolutely. Every practitioner on our platform undergoes a rigorous vetting process, verifying their credentials, licenses, and professional history to ensure you receive the highest standard of care."
  },
  {
    q: "Is my medical data secure?",
    a: "We employ military-grade encryption to safeguard your personal and medical information. Your privacy is not just a feature; it is the foundation of our architecture."
  },
  {
    q: "Can I reschedule an appointment?",
    a: "Yes, we understand that life flows unpredictably. You can seamlessly reschedule your appointments up to 24 hours in advance directly from your dashboard."
  },
  {
    q: "How do virtual consultations work?",
    a: "After booking, you'll receive a secure link to join a high-fidelity video room at your scheduled time. There are no downloads required; the room launches directly in your browser."
  },
  {
    q: "What if I need an in-person visit?",
    a: "While we specialize in digital health, many of our specialists operate physical clinics as well. If an in-person examination is deemed necessary, your doctor will coordinate the transition."
  }
];

const FaqAccordion = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className={`liquid-glass rounded-2xl overflow-hidden transition-all duration-500 border border-white/5 cursor-pointer hover:bg-white/5 ${isOpen ? 'bg-white/5 shadow-2xl' : ''}`}
      onClick={onClick}
    >
      <div className="p-6 md:p-8 flex justify-between items-center select-none">
        <h4 className="text-xl font-medium text-foreground pr-8">{question}</h4>
        <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transform transition-transform duration-500 ${isOpen ? 'rotate-180 bg-white/10' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <div 
        className={`px-6 md:px-8 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
      >
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base border-t border-white/5 pt-6 mt-[-1rem]">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground font-body select-none">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 bg-background pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Navigation Bar */}
      <nav 
        className={`
          fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out flex flex-row justify-between items-center
          ${isScrolled 
            ? "top-6 w-[75%] max-w-5xl px-8 py-3 rounded-full liquid-glass shadow-lg" 
            : "top-0 w-full max-w-7xl px-8 py-6 bg-transparent"}
        `}
      >
        <div className="flex items-center">
          <span 
            className={`tracking-tight text-foreground font-normal transition-all duration-500 ${isScrolled ? "text-2xl" : "text-3xl"}`}
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Velorah<sup className="text-xs">®</sup>
          </span>
        </div>

        <div className="hidden md:flex flex-row items-center gap-6 lg:gap-8">
          <Link to="/" className="text-sm text-foreground transition-colors font-medium">Home</Link>
          <Link to="/patient/doctors" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden lg:block">Find Doctors</Link>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">How it works</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">About</a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">FAQ</a>
        </div>

        <div>
          <Link 
            to="/login"
            className={`
              liquid-glass rounded-full font-medium text-foreground hover:scale-[1.03] transition-all duration-300 inline-block
              ${isScrolled ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-sm"}
            `}
          >
            Begin Journey
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen w-full">
        <h1 
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-muted-foreground">healing</em> begins in <em className="not-italic text-muted-foreground">the silence.</em>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          Book verified doctors, manage appointments seamlessly, and access modern healthcare without the chaos. 
          Amid the noise, we build digital spaces for sharp focus and inspired care.
        </p>

        <Link 
          to="/register"
          className="liquid-glass rounded-full px-14 py-5 text-base font-medium text-foreground mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-fade-rise-delay-2 inline-block"
        >
          Schedule Appointment
        </Link>
      </main>

      {/* About Section */}
      <section id="about" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32 mt-12">
        <div className="liquid-glass rounded-[2rem] p-12 md:p-24 text-center flex flex-col items-center border border-white/5">
          <h2 className="text-4xl md:text-5xl font-normal mb-8 text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The Philosophy of Care
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
            Velorah was born out of a simple realization: healthcare should feel less like a transaction and more like a sanctuary. We believe in stripping away the noise of modern clinics to bring you direct, uninterrupted focus from elite medical professionals. Our platform bridges the gap between those seeking care and the healers providing it, wrapped in an experience of profound tranquility.
          </p>
        </div>
      </section>

      {/* What It Does Section */}
      <section id="features" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-4xl md:text-6xl font-normal text-center mb-20" style={{ fontFamily: "'Instrument Serif', serif" }}>
          What it <em className="not-italic text-muted-foreground">does</em>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-3xl p-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5">
             <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
             </div>
             <h3 className="text-2xl font-medium mb-4 text-foreground">High-Fidelity Virtual Rooms</h3>
             <p className="text-muted-foreground leading-relaxed text-sm">
               Experience consultations in crystal-clear quality. Our video architecture minimizes latency, ensuring every nuance of your conversation is captured.
             </p>
          </div>

          <div className="liquid-glass rounded-3xl p-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5">
             <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
             </div>
             <h3 className="text-2xl font-medium mb-4 text-foreground">Instant Digital Prescriptions</h3>
             <p className="text-muted-foreground leading-relaxed text-sm">
               Receive cryptographically secure prescriptions immediately following your consultation, ready to be fulfilled at your pharmacy of choice.
             </p>
          </div>

          <div className="liquid-glass rounded-3xl p-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5">
             <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <h3 className="text-2xl font-medium mb-4 text-foreground">Asynchronous Care</h3>
             <p className="text-muted-foreground leading-relaxed text-sm">
               Not every question requires a live meeting. Engage in secure, asynchronous messaging with your specialists for continuous care.
             </p>
          </div>

          <div className="liquid-glass rounded-3xl p-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5">
             <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
             </div>
             <h3 className="text-2xl font-medium mb-4 text-foreground">Immutable Health Records</h3>
             <p className="text-muted-foreground leading-relaxed text-sm">
               Your medical history is maintained in a centralized, highly secure vault, giving you total ownership and control over your data.
             </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-4xl md:text-6xl font-normal text-center mb-20" style={{ fontFamily: "'Instrument Serif', serif" }}>
          How it <em className="not-italic text-muted-foreground">flows</em>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="liquid-glass rounded-3xl p-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5">
            <span className="text-6xl font-normal text-muted-foreground/30 mb-8 block" style={{ fontFamily: "'Instrument Serif', serif" }}>01</span>
            <h3 className="text-2xl font-medium mb-4 text-foreground">Discover</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Explore our curated network of certified specialists. Filter by expertise, read detailed profiles, and find the perfect match for your needs.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="liquid-glass rounded-3xl p-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5">
            <span className="text-6xl font-normal text-muted-foreground/30 mb-8 block" style={{ fontFamily: "'Instrument Serif', serif" }}>02</span>
            <h3 className="text-2xl font-medium mb-4 text-foreground">Schedule</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Select a time that aligns with your rhythm. Our seamless booking interface ensures your appointment is secured without friction.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="liquid-glass rounded-3xl p-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5">
            <span className="text-6xl font-normal text-muted-foreground/30 mb-8 block" style={{ fontFamily: "'Instrument Serif', serif" }}>03</span>
            <h3 className="text-2xl font-medium mb-4 text-foreground">Connect</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Meet your healthcare provider in our secure, immersive virtual consultation rooms or receive details for your in-person visit.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 w-full max-w-4xl mx-auto px-6 py-32">
        <h2 className="text-4xl md:text-6xl font-normal text-center mb-20" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Common <em className="not-italic text-muted-foreground">inquiries</em>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqAccordion 
              key={index} 
              question={faq.q} 
              answer={faq.a} 
              isOpen={openFaqIndex === index}
              onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full mt-20 bg-background/50 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row justify-between items-start md:items-start gap-12">
          <div className="flex flex-col">
            <span 
              className="tracking-tight text-foreground font-normal text-4xl mb-6 block"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Velorah<sup className="text-sm">®</sup>
            </span>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Reimagining the intersection of design, technology, and deeply personal healthcare.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-12 md:gap-24">
            <div className="flex flex-col gap-5">
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase mb-2">Platform</span>
              <Link to="/patient/doctors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Find Doctors</Link>
              <Link to="/patient/appointments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Appointments</Link>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            </div>
            
            <div className="flex flex-col gap-5">
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase mb-2">Company</span>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQs</a>
            </div>
            
            <div className="flex flex-col gap-5">
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase mb-2">Legal</span>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mx-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Velorah Healthcare. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
