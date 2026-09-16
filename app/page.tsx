import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Contents from "@/components/Contents";
import Featured from "@/components/Featured";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FilterProvider from "@/components/FilterProvider";
import ContentsRail from "@/components/ContentsRail";

export default function Home() {
  return (
    <FilterProvider>
      <Nav />
      <ContentsRail />
      <main id="main" className="flex-1">
        <Hero />
        <Stats />
        <Contents />
        <Experience />
        <Featured />
        <Projects />
        <Awards />
        <Education />
        <Skills />
      </main>
      <Footer />
      <BackToTop />
    </FilterProvider>
  );
}
