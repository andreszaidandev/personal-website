// src/App.jsx
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Education from "./components/education";
import Projects from "./components/projects";

// import other sections...
import "./App.css";




function App() {
  const [activeSection, setActiveSection] = useState("Profile");

  useEffect(() => {
    const sectionIds = ["Profile", "Education", "Projects", "Experience", "Contact","Resume"];

    function onScroll() {
      const scrollPos = window.scrollY + 200; // 200px offset from top
      let current = "Profile";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          current = id;
          break;
        }
      }

      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // set initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />

      <main>
        <section id="Profile">
          <Hero />
        </section>

        <section id="Education">
          <Education/>
        </section>

        <section id="Projects">
          <Projects />
        </section>

        <section id="Experience">
          
        </section>

        <section id="Contact">
          {/* your Contact component */}
        </section>
        <section id="Resume">
          {/* your Resume component */}
        </section>

      </main>
    </>
  );
}

export default App;
