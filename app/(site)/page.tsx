import Navbar from "@/components/Navbar";
import Hero from "./Hero";
import About from "./about";
import Features from "./features";
import Pricing from "./pricing";
import QuestionBank from "./questionbank";
import Testimonials from "./testiminials";
import Footer from "./footer";

export default function HeroSection() {


  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Pricing />
      <QuestionBank />
      <Testimonials />
      <Footer />
    </div>
  );
}
