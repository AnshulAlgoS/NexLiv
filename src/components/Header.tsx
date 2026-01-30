import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, Menu, X, Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout, userRole } = useAuth();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const allNavLinks = [
    { to: "/", label: "Home", icon: Home, visible: true },
    { to: "/explore", label: "Explore", icon: Search, visible: true },
    { to: "/list-property", label: "List Property", icon: PlusCircle, visible: userRole !== 'seeker' },
  ];

  const navLinks = allNavLinks.filter(link => link.visible);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at 100% 0%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 100% 0%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants: Variants = {
    closed: { y: 80, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 + i * 0.1 }
    })
  };

  return (
    <>
      <Link to="/" className="fixed top-6 left-6 z-50 group">
        <div className="flex items-center gap-0 transition-transform hover:scale-105">
            <img src="/NexLiv_Logo.png" alt="NexLiv Logo" className="h-32 w-auto object-contain drop-shadow-2xl" />
            <div className="flex flex-col -ml-6">
                <span className="font-black text-6xl tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-none font-sans">NEXLIV</span>
                <span className="text-sm font-bold tracking-[0.2em] text-white/90 uppercase leading-none mt-1.5 drop-shadow-md ml-1">Real Estate</span>
            </div>
        </div>
      </Link>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-6 right-6 z-50 pointer-events-auto"
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group relative h-12 w-12 rounded-full bg-black/5 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center overflow-hidden transition-all hover:scale-110 hover:bg-black/10"
        >
          <div className="relative z-10 mix-blend-difference">
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-[#1a0505] flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-4xl px-8 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="flex flex-col gap-6">
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-4">Navigation</p>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    custom={i}
                    variants={linkVariants}
                  >
                    <Link 
                      to={link.to}
                      className="group flex items-center gap-6 text-5xl md:text-6xl font-black text-white/90 hover:text-white transition-colors"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-4xl">
                        ➜
                      </span>
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                          {link.label}
                        </span>
                        <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary">
                          {link.label}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col justify-center border-l border-white/10 pl-12"
              >
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-8">User Profile</p>
                
                {currentUser ? (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-2xl">
                        <AvatarImage src={currentUser.photoURL || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-yellow-600 text-black text-3xl font-bold">
                          {currentUser.displayName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                          {currentUser.displayName || "User"}
                        </h3>
                        <p className="text-white/50">{currentUser.email}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link to="/profile">
                            <Button variant="outline" className="w-full justify-start text-lg h-14 border-white/20 hover:bg-white/5 hover:text-primary transition-all">
                                <UserIcon className="mr-3 h-5 w-5" />
                                View Profile
                            </Button>
                        </Link>
                        <Button 
                            variant="destructive" 
                            className="w-full justify-start text-lg h-14 bg-red-900/30 hover:bg-red-900/50 border border-red-500/20 text-red-400"
                            onClick={() => logout()}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Sign Out
                        </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Join NEXLIV</h3>
                    <p className="text-white/60 text-lg">Sign in to list properties, save favorites, and explore exclusive deals.</p>
                    <Link to="/login">
                        <Button className="w-full text-lg h-14 bg-primary hover:bg-primary/90 text-black font-bold">
                            Login / Sign Up
                        </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
