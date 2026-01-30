import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2, Shield, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { AuthMascot } from "@/components/AuthMascot";

type MascotState = "idle" | "email" | "password" | "success" | "error" | "name";

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>("idle");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setMascotState("success");
    try {
        await signInWithGoogle();
        toast.success("Welcome back!", {
            description: "You have successfully logged in with Google.",
        });
        navigate("/");
    } catch (error: unknown) {
        setMascotState("error");
        const errorMessage = error instanceof Error ? error.message : "Could not sign in with Google.";
        toast.error("Login Failed", {
            description: errorMessage
        });
        setTimeout(() => setMascotState("idle"), 2000);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMascotState("success");

    try {
      await signInWithEmail(formData.email, formData.password);
      toast.success("Welcome back!", {
        description: "You have successfully logged in.",
      });
      navigate("/");
    } catch (error: unknown) {
      setMascotState("error");
      const errorMessage = error instanceof Error ? error.message : "Could not sign in.";
      toast.error("Login Failed", {
        description: errorMessage
      });
      setTimeout(() => setMascotState("idle"), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#fdfbf7] overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#800020]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container - Split Layout */}
      <div className="flex w-full h-full min-h-screen">
        
        {/* Left Side - Branding & Mascot (Visible on Desktop) */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between relative z-10 p-16 bg-[#fdfbf7]">
            {/* Top Branding */}
            <div>
                <div className="inline-flex items-center gap-3 mb-10">
                    <img src="/NexLiv_Logo.png" alt="NexLiv Logo" className="h-24 w-auto object-contain" />
                    <span className="font-bold text-[#2a0808] text-3xl tracking-tight">NEXLIV</span>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-6xl font-black text-[#2a0808] mb-6 tracking-tight leading-[1.1]">
                        Welcome <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800020] to-orange-600">Back Home.</span>
                    </h1>
                    <p className="text-xl text-[#2a0808]/60 max-w-md leading-relaxed">
                        Sign in to manage your property journey with enhanced security and real-time updates.
                    </p>
                </motion.div>
            </div>

            {/* Middle - Feature List */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                {[
                    { title: "Smart Matching", desc: "AI-driven property recommendations.", icon: Zap },
                    { title: "Verified Listings", desc: "100% authentic property details.", icon: CheckCircle2 },
                    { title: "Secure Data", desc: "Enterprise-grade security standards.", icon: Shield }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-[#800020] shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#2a0808] text-lg">{item.title}</h3>
                            <p className="text-sm text-[#2a0808]/60">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
            
            {/* Bottom - Mascot (Centered and scaled appropriately) */}
            <div className="relative w-full flex justify-center mt-8">
                <div className="transform scale-100 hover:scale-105 transition-transform duration-500">
                    <AuthMascot state={mascotState} />
                </div>
            </div>
        </div>

        {/* Right Side - Login Form (Dark Modal) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 relative z-10">
            {/* Mobile Mascot (Visible on Small Screens) */}
            <div className="lg:hidden absolute top-8 left-1/2 -translate-x-1/2 z-20">
                 <AuthMascot state={mascotState} />
            </div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-md mt-24 lg:mt-0"
            >
                <div className="bg-[#500014] p-8 md:p-10 shadow-2xl relative overflow-hidden rounded-sm border border-[#800020]/50">
                    {/* Dark/Maroon Modal Styling */}
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="text-center mb-8 relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">MEMBER LOGIN</h2>
                        <div className="h-0.5 w-12 bg-orange-500 mx-auto" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/70 text-xs uppercase tracking-wider ml-1">Email Address</Label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/40 group-focus-within:text-orange-400 transition-colors" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setMascotState("email")}
                                    onBlur={() => setMascotState("idle")}
                                    className="pl-12 bg-[#2a0808]/50 border-white/10 text-white placeholder:text-white/20 h-12 rounded-sm focus:border-orange-500 focus:ring-0 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white/70 text-xs uppercase tracking-wider ml-1">Password</Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/40 group-focus-within:text-orange-400 transition-colors" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setMascotState("password")}
                                    onBlur={() => setMascotState("idle")}
                                    className="pl-12 bg-[#2a0808]/50 border-white/10 text-white placeholder:text-white/20 h-12 rounded-sm focus:border-orange-500 focus:ring-0 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end pt-2">
                            <Link to="/forgot-password" className="text-xs text-white/50 hover:text-orange-400 transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold rounded-sm text-sm uppercase tracking-widest transition-all shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 transform hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign In <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8 z-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#500014] px-4 text-white/40">Or continue with</span>
                        </div>
                    </div>

                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white hover:text-[#500014] hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-sm font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 relative z-10 flex items-center justify-center gap-3 group"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                        )}
                        Google
                    </Button>

                    <div className="mt-8 text-center relative z-10">
                        <p className="text-white/60 text-sm">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-bold hover:underline ml-1">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;