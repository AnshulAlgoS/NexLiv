import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type MascotState = "idle" | "email" | "password" | "success" | "error" | "name";

interface AuthMascotProps {
  state: MascotState;
  className?: string;
}

export const AuthMascot = ({ state, className = "" }: AuthMascotProps) => {
  const [message, setMessage] = useState("Hi there! I'm Roomgi.");

  useEffect(() => {
    switch (state) {
      case "idle":
        setMessage("Ready to explore?");
        break;
      case "email":
        setMessage("I need your email address.");
        break;
      case "password":
        setMessage("Don't worry, I'm not looking!");
        break;
      case "name":
        setMessage("What should I call you?");
        break;
      case "success":
        setMessage("Looking good! Welcome in.");
        break;
      case "error":
        setMessage("Hmm, something's not right.");
        break;
    }
  }, [state]);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={message}
        className="absolute -top-24 bg-white text-black px-4 py-2 rounded-xl rounded-bl-none shadow-lg border-2 border-black font-bold text-sm whitespace-nowrap z-20"
      >
        {message}
      </motion.div>

      <div className="relative w-32 h-32">
        <motion.div
          className="w-24 h-20 bg-neutral-900 border-2 border-white/20 rounded-2xl absolute left-4 top-6 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          animate={{
            y: [0, -5, 0],
            rotate: state === "error" ? [0, -5, 5, 0] : 0
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.5 }
          }}
        >
          <div className="w-20 h-14 bg-black rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center gap-2">
            
            {state === "password" ? (
               <motion.div 
                 initial={{ y: 20 }} 
                 animate={{ y: 0 }} 
                 className="flex gap-1"
               >
                 <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/20" />
                 <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/20" />
               </motion.div>
            ) : (
                <>
                  <motion.div
                    className="w-4 h-6 bg-primary rounded-full shadow-[0_0_10px_#ef4444]"
                    animate={{
                      height: state === "success" ? 4 : state === "email" ? 4 : 24,
                      width: state === "success" ? 16 : 16,
                      rotate: state === "success" ? -15 : 0,
                      y: state === "email" ? 5 : 0
                    }}
                  />
                  <motion.div
                    className="w-4 h-6 bg-primary rounded-full shadow-[0_0_10px_#ef4444]"
                    animate={{
                      height: state === "success" ? 4 : state === "email" ? 4 : 24,
                      width: state === "success" ? 16 : 16,
                      rotate: state === "success" ? 15 : 0,
                      y: state === "email" ? 5 : 0
                    }}
                  />
                </>
            )}

            {state !== "password" && (
                <motion.div 
                    className="absolute bottom-3 w-4 h-1 bg-white/50 rounded-full"
                    animate={{
                        width: state === "success" ? 10 : state === "error" ? 8 : 4,
                        height: state === "success" ? 6 : 1,
                        borderRadius: state === "success" ? "0 0 10px 10px" : "2px"
                    }}
                />
            )}
          </div>
        </motion.div>

        <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-gray-500"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            <div className={`w-3 h-3 rounded-full absolute -top-1 -left-1 shadow-[0_0_15px_currentColor] transition-colors duration-300 ${state === 'error' ? 'bg-red-500 text-red-500' : state === 'success' ? 'bg-green-500 text-green-500' : 'bg-primary text-primary'}`} />
        </motion.div>
      </div>
    </div>
  );
};
