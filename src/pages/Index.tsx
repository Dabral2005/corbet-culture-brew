import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Menu />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
