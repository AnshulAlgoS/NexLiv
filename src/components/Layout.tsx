
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@/context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userRole, loading } = useAuth();

  useEffect(() => {
    // Redirect to onboarding if user is logged in but has no role
    if (!loading && currentUser && userRole === null && location.pathname !== '/onboarding') {
        navigate('/onboarding');
    }
  }, [currentUser, userRole, loading, location.pathname, navigate]);

  useEffect(() => {
    // Disable smooth scrolling on Explore page to allow native inner scrolling
    if (location.pathname.startsWith('/explore')) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground selection:bg-primary/30">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
