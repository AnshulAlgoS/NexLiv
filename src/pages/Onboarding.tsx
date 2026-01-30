import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Home, Key, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthMascot } from "@/components/AuthMascot";

import { useToast } from "@/components/ui/use-toast";

const Onboarding = () => {
  const { updateUserRole, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);
    try {
      await updateUserRole(selectedRole);
      // Redirect to profile for completion regardless of role
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update role", error);
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  // If user is not logged in, they shouldn't be here
  if (!currentUser) {
      navigate("/login");
      return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#800020]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        {/* Mascot - Centered Top */}
        <div className="mb-8">
            <AuthMascot state={selectedRole ? "success" : "idle"} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-[#2a0808] mb-4 tracking-tight">
            Select Your Role
          </h1>
          <p className="text-xl text-[#2a0808]/60">
            How will you interact with the NEXLIV ecosystem?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full">
          {/* Seeker Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect('seeker')}
            className={`cursor-pointer relative p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-6 group shadow-lg ${
              selectedRole === 'seeker'
                ? "bg-white border-[#800020] shadow-[#800020]/20"
                : "bg-white border-transparent hover:border-gray-200 hover:shadow-xl"
            }`}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-colors shadow-inner ${
                selectedRole === 'seeker' ? "bg-gradient-to-br from-[#800020] to-orange-600 text-white" : "bg-gray-100 text-[#2a0808]/40 group-hover:text-[#800020] group-hover:bg-[#800020]/10"
            }`}>
                <Home className="w-10 h-10" />
            </div>
            <div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors ${selectedRole === 'seeker' ? "text-[#800020]" : "text-[#2a0808]"}`}>
                    Seeker Access
                </h3>
                <p className="text-[#2a0808]/60">Find residential units and submit applications.</p>
            </div>
            {selectedRole === 'seeker' && (
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-[#800020] text-white rounded-full p-1 shadow-lg"
                >
                    <Check className="w-4 h-4" />
                </motion.div>
            )}
          </motion.div>

          {/* Owner Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect('owner')}
            className={`cursor-pointer relative p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-6 group shadow-lg ${
              selectedRole === 'owner'
                ? "bg-white border-[#800020] shadow-[#800020]/20"
                : "bg-white border-transparent hover:border-gray-200 hover:shadow-xl"
            }`}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-colors shadow-inner ${
                selectedRole === 'owner' ? "bg-gradient-to-br from-[#800020] to-orange-600 text-white" : "bg-gray-100 text-[#2a0808]/40 group-hover:text-[#800020] group-hover:bg-[#800020]/10"
            }`}>
                <Key className="w-10 h-10" />
            </div>
            <div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors ${selectedRole === 'owner' ? "text-[#800020]" : "text-[#2a0808]"}`}>
                    Owner Access
                </h3>
                <p className="text-[#2a0808]/60">List properties and manage tenant applications.</p>
            </div>
            {selectedRole === 'owner' && (
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-[#800020] text-white rounded-full p-1 shadow-lg"
                >
                    <Check className="w-4 h-4" />
                </motion.div>
            )}
          </motion.div>
        </div>

        <div className="flex justify-center w-full max-w-md">
            <Button
                onClick={handleContinue}
                disabled={!selectedRole || loading}
                className={`w-full h-14 px-12 rounded-xl text-lg font-bold transition-all duration-300 ${
                    selectedRole 
                    ? "bg-gradient-to-r from-[#800020] to-orange-600 hover:scale-105 shadow-xl shadow-orange-500/30 text-white" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
                {loading ? "Processing..." : (
                    <span className="flex items-center gap-2">
                        Complete Profile <ArrowRight className="w-5 h-5" />
                    </span>
                )}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;