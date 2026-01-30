import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, Variants } from "framer-motion";

const Footer = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img src="/NexLiv_Logo.png" alt="NexLiv Logo" className="h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
              <span className="text-4xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">NEXLIV</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 text-base">
              NEXLIV is not just where you search properties. It’s where you design your lifestyle with intelligent insights.
            </p>
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: "rgba(255, 215, 0, 0.2)" }}
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-colors text-gray-400 hover:text-primary hover:border-primary/50"
                >
                   <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-xl mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span> Quick Links
            </h4>
            <ul className="space-y-4 text-gray-400">
              {['Browse Properties', 'List Your Property', 'AI Recommendations', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-xl mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span> Property Types
            </h4>
            <ul className="space-y-4 text-gray-400">
              {[
                { label: 'Rooms', query: 'room' },
                { label: 'PG & Hostels', query: 'pg' },
                { label: 'Flats & Apartments', query: 'flat' },
                { label: 'Houses & Villas', query: 'house' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={`/explore?type=${item.query}`} className="hover:text-primary hover:pl-2 transition-all duration-300 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-xl mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span> Contact Us
            </h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="group-hover:text-white transition-colors">support@nexliv.com</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span className="group-hover:text-white transition-colors">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="group-hover:text-white transition-colors">Koramangala, Bangalore<br />Karnataka 560034</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, borderTopWidth: 0 }}
          whileInView={{ opacity: 1, borderTopWidth: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500"
        >
          <p>© 2026 NEXLIV. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-primary transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/" className="hover:text-primary transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
