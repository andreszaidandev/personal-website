// src/components/Navbar.jsx
import "./navbar.css";

function Navbar({ activeSection }) {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <a
          href="#Profile"
          className={activeSection === "Profile" ? "active" : ""}
        >
          Profile
        </a>
        <a
          href="#Education"
          className={activeSection === "Education" ? "active" : ""}
        >
          Education
        </a>
        <a
          href="#Projects"
          className={activeSection === "Projects" ? "active" : ""}
        >
          Projects
        </a>
        <a
          href="#Experience"
          className={activeSection === "Experience" ? "active" : ""}
        >
          Experience
        </a>
        <a
          href="#Contact"
          className={activeSection === "Contact" ? "active" : ""}
        >
          Contact
        </a>
         <a
          href="#Resume"
          className={activeSection === "Resume" ? "active" : ""}
        >
          Resume
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
