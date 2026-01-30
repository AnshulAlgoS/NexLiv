import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Activity, Users, Building2, BarChart3, ShieldCheck, CheckCircle, Search, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { currentUser } = useAuth();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Stagger
      const tl = gsap.timeline();
      tl.from(".hero-text-element", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })
      .from(".hero-buttons", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // 2. Stats Floating Animation (Continuous)
      gsap.to(".stats-container", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 3. Feature Cards Stagger on Scroll
      gsap.from(".feature-card-wrapper", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // 4. "How It Works" Image Reveal
      gsap.from(".reveal-image", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".how-it-works-section",
          start: "top 70%",
        }
      });

      gsap.from(".reveal-text", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".how-it-works-section",
          start: "top 70%",
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="overflow-x-hidden bg-gray-50 min-h-screen font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50 group"
      >
        <Link to="/">
          <div className="flex items-center gap-0 transition-transform hover:scale-105">
              <img src="/NexLiv_Logo.png" alt="NexLiv Logo" className="h-32 w-auto object-contain drop-shadow-2xl" />
              <div className="flex flex-col -ml-6">
                  <span className="font-black text-6xl tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-none font-sans">NEXLIV</span>
                  <span className="text-sm font-bold tracking-[0.2em] text-white/90 uppercase leading-none mt-1.5 drop-shadow-md ml-1">Real Estate</span>
              </div>
          </div>
        </Link>
      </motion.div>
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop" 
                alt="City Landscape" 
                className="w-full h-full object-cover"
            />
            {/* Professional Overlay: Deep Maroon + Warm Tint */}
            <div className="absolute inset-0 bg-[#4a0a0a]/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#A61B1B]/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 md:pt-0">
            <div className="hero-text-element mb-6 md:mb-8">
                <span className="inline-block py-1.5 px-4 md:py-2 md:px-6 border border-white/20 bg-black/20 backdrop-blur-sm text-[9px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/90 shadow-sm hover:bg-white/5 transition-colors cursor-default">
                    Next Gen Living Intelligence
                </span>
            </div>
            
            <h1 className="hero-text-element text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 drop-shadow-xl">
              Understand the <span className="text-[#FACC15] relative inline-block">
                Place
                <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-[#A61B1B]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> <br/>
              Before You Rent the Space.
            </h1>
            
            <p className="hero-text-element text-lg md:text-2xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed px-4">
              We don't just show you apartments. We reveal the heartbeat of the neighborhood—safety, vibes, and community.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center w-full px-4 sm:px-0">
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} className="w-full sm:w-auto">
                <Link to="/explore" className="block w-full sm:w-auto">
                    <Button size="xl" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl bg-[#FACC15] text-[#4a0a0a] hover:bg-[#ffe066] font-bold rounded-xl shadow-[0_10px_20px_rgba(250,204,21,0.3)] border-b-4 border-[#d4ac0d] active:border-b-0 active:translate-y-1 transition-all">
                        <MapPin className="mr-2 h-5 w-5 md:h-6 md:w-6" /> Explore Areas
                    </Button>
                </Link>
              </Tilt>
              
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} className="w-full sm:w-auto">
                <Link to="/list-property" className="block w-full sm:w-auto">
                    <Button size="xl" variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 font-bold rounded-xl backdrop-blur-md shadow-lg">
                        List Property
                    </Button>
                </Link>
              </Tilt>
            </div>
        </div>

        {/* Animated Floating Elements Removed */}

      </section>

      {/* STATS BAR (Floating Overlap) */}
      <div className="container relative z-20 -mt-16 px-4">
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
            <div className="stats-container bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-gray-100">
                <div className="text-center group cursor-default">
                    <h3 className="text-3xl md:text-4xl font-black text-[#A61B1B] mb-1 group-hover:scale-110 transition-transform duration-300">50+</h3>
                    <p className="text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest">Active Zones</p>
                </div>
                <div className="text-center group cursor-default">
                    <h3 className="text-3xl md:text-4xl font-black text-[#A61B1B] mb-1 group-hover:scale-110 transition-transform duration-300">10k+</h3>
                    <p className="text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest">Verified Homes</p>
                </div>
                <div className="text-center group cursor-default">
                    <h3 className="text-3xl md:text-4xl font-black text-[#A61B1B] mb-1 group-hover:scale-110 transition-transform duration-300">98%</h3>
                    <p className="text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest">Match Rate</p>
                </div>
                <div className="text-center group cursor-default">
                    <h3 className="text-3xl md:text-4xl font-black text-[#A61B1B] mb-1 group-hover:scale-110 transition-transform duration-300">0%</h3>
                    <p className="text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest">Brokerage</p>
                </div>
            </div>
        </Tilt>
      </div>

      {/* FEATURES SECTION (Rectangular 3D Cards) */}
      <section className="features-section py-20 md:py-32 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FACC15]/5 skew-x-12 -z-10" />
        
        <div className="container px-4">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#4a0a0a] mb-6">Locality-First Decisions</h2>
            <p className="text-xl text-gray-600">Most platforms sell you four walls. We help you find your place in the world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {/* Card 1 */}
            <div className="feature-card-wrapper h-full">
                <Tilt 
                    className="h-full"
                    perspective={1000} 
                    glareEnable={true} 
                    glareMaxOpacity={0.2} 
                    glareColor="#ffffff" 
                    glarePosition="all" 
                    scale={1.02}
                >
                    <div className="h-full bg-white p-8 rounded-xl border-2 border-gray-100 shadow-[0_10px_0_rgba(229,231,235,1)] hover:shadow-[0_15px_0_rgba(166,27,27,0.1)] hover:border-[#A61B1B]/20 transition-all duration-300 flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#A61B1B] group-hover:rotate-12 transition-all duration-300 shadow-inner">
                            <BarChart3 className="w-10 h-10 text-[#A61B1B] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Data-Driven Insights</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Real-time safety scores, connectivity ratings, and price trends visualized on interactive heatmaps.
                        </p>
                    </div>
                </Tilt>
            </div>

            {/* Card 2 */}
            <div className="feature-card-wrapper h-full">
                <Tilt 
                    className="h-full"
                    perspective={1000} 
                    glareEnable={true} 
                    glareMaxOpacity={0.2} 
                    glareColor="#ffffff" 
                    glarePosition="all" 
                    scale={1.02}
                >
                    <div className="h-full bg-white p-8 rounded-xl border-2 border-gray-100 shadow-[0_10px_0_rgba(229,231,235,1)] hover:shadow-[0_15px_0_rgba(250,204,21,0.4)] hover:border-[#FACC15] transition-all duration-300 flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FACC15] group-hover:-rotate-12 transition-all duration-300 shadow-inner">
                            <Building2 className="w-10 h-10 text-yellow-700 group-hover:text-[#4a0a0a] transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Living Profile Engine</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Tell us who you are—student, professional, or family—and we'll match you with the perfect micro-market.
                        </p>
                    </div>
                </Tilt>
            </div>

            {/* Card 3 */}
            <div className="feature-card-wrapper h-full">
                <Tilt 
                    className="h-full"
                    perspective={1000} 
                    glareEnable={true} 
                    glareMaxOpacity={0.2} 
                    glareColor="#ffffff" 
                    glarePosition="all" 
                    scale={1.02}
                >
                    <div className="h-full bg-white p-8 rounded-xl border-2 border-gray-100 shadow-[0_10px_0_rgba(229,231,235,1)] hover:shadow-[0_15px_0_rgba(37,99,235,0.1)] hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 shadow-inner">
                            <Users className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Verified</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Honest reviews from actual residents about water supply, landlords, and neighborhood vibe.
                        </p>
                    </div>
                </Tilt>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (Split Screen with 3D Image) */}
      <section className="how-it-works-section py-24 bg-white relative">
        <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* 3D Image Wrapper */}
                <div className="reveal-image order-2 lg:order-1 relative perspective-1000">
                     <Tilt tiltMaxAngleX={5} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.3}>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 ease-out">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                             <img 
                                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop" 
                                alt="Map Interface" 
                                className="w-full h-auto object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
                             />
                             <div className="absolute bottom-6 left-6 z-20 text-white">
                                 <div className="bg-[#A61B1B] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">LIVE DATA</div>
                                 <p className="font-bold text-lg">Indiranagar, Bangalore</p>
                                 <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                     ★★★★★ <span className="text-white/80 ml-1">(4.8 Safety Score)</span>
                                 </div>
                             </div>
                        </div>
                     </Tilt>
                     {/* Floating Badge */}
                     <div className="absolute -top-6 -right-6 z-30 animate-bounce-slow">
                        <div className="bg-[#FACC15] text-[#4a0a0a] font-black text-xl w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 border-white transform rotate-12">
                            Top<br/>Rated
                        </div>
                     </div>
                </div>

                {/* Content */}
                <div className="reveal-text order-1 lg:order-2 space-y-6 md:space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                        Shift from <br/>
                        <span className="text-gray-400 decoration-4 line-through decoration-[#A61B1B]">"Which Room?"</span> <br/>
                        to <span className="text-[#A61B1B]">"Which Area?"</span>
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start group">
                            <div className="mt-1 bg-green-100 p-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                <CheckCircle className="h-6 w-6 text-green-600 group-hover:text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Smart Locality Matching</h4>
                                <p className="text-gray-600 mt-1">Our engine matches your preferences with locality characteristics to generate a compatibility score.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start group">
                             <div className="mt-1 bg-green-100 p-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                <ShieldCheck className="h-6 w-6 text-green-600 group-hover:text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Safety First</h4>
                                <p className="text-gray-600 mt-1">We aggregate crime data, street lighting reports, and resident feedback to build a safety profile.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start group">
                             <div className="mt-1 bg-green-100 p-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                <Heart className="h-6 w-6 text-green-600 group-hover:text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Lifestyle Fit</h4>
                                <p className="text-gray-600 mt-1">Whether you need gyms, parks, or pubs nearby, we find the area that matches your vibe.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <Link to="/explore">
                            <Button className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl bg-[#A61B1B] hover:bg-[#8a1616] text-white shadow-lg shadow-red-900/20">
                                Start Your Search <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-[#4a0a0a] relative overflow-hidden text-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="container relative z-10 px-4">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8">Ready to move smarter?</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                Join thousands of users who found their perfect neighborhood with NEXLIV.
            </p>
            <div className="flex justify-center gap-4 w-full">
                 {currentUser ? (
                    <Link to="/profile" className="w-full sm:w-auto">
                        <Button size="xl" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl bg-[#FACC15] text-[#4a0a0a] hover:bg-white hover:text-[#A61B1B] font-bold rounded-full shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                            Go to Dashboard
                        </Button>
                    </Link>
                 ) : (
                     <Link to="/signup" className="w-full sm:w-auto">
                        <Button size="xl" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl bg-[#FACC15] text-[#4a0a0a] hover:bg-white hover:text-[#A61B1B] font-bold rounded-full shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                            Get Started Now
                        </Button>
                     </Link>
                 )}
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
