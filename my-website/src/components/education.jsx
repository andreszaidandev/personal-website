import "./education.css";
import vtLogo from "../assets/Vtech.jpg";
import vturcsLogo from "../assets/vturcs.jpg";
import Spline from '@splinetool/react-spline';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiMysql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skills = [
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "HTML", icon: SiHtml5, color: "#e34c26" },
  { name: "CSS", icon: SiCss3, color: "#1572b6" },
  { name: "SQL", icon: SiMysql, color: "#00758f" },
];

function Education() {
  return (
    <div className="education-section-wrapper">
      <div className="education-container">
        {/* Left: Cards */}
        <div className="education-cards-left">
          <div className="education-card" style={{ backgroundImage: `url(${vtLogo})` }}>
            <div className="education-details">
              <h3 className="education-degree">Bachelor of Science</h3>
              <p className="education-institution">Major in Computer Science, Minor in Mathematics</p>
              <p className="education-dates">August 2023 - Dec 2025</p>
              <p className="education-honors">3.67 GPA</p>
            </div>
          </div>

          <div className="VTURCS-card" style={{ backgroundImage: `url(${vturcsLogo})` }}>
            <div className="education-details">
              <h3 className="education-degree">VTURCS</h3>
              <p className="education-institution">Virginia Tech Undergraduate Research and CapStone</p>
              <p className="education-dates">2nd in peoples category · 3rd in judges category</p>
              <p className="education-description">Implemented a system for the Graduate deparment to automate, digitalize and simplify Plans of Study for graduate students and faculty.</p>
            </div>
          </div>
        </div>

        {/* Right: Skills + Spline */}
        <div className="education-right-section">
          {/* Top Right: Skills */}
          <div className="education-skills">
  {/* Row 1 – 4 icons */}
  <div className="education-skills-row">
    {skills.slice(0, 4).map(({ name, icon: Icon }) => (
      <div key={name} className="education-skill-icon-item">
        <Icon className="skill-icon" />
        <span className="education-skill-label">{name}</span>
      </div>
    ))}
  </div>

  {/* Row 2 – 3 icons, centered */}
  <div className="education-skills-row education-skills-row--center">
    {skills.slice(4).map(({ name, icon: Icon }) => (
      <div key={name} className="education-skill-icon-item">
        <Icon className="skill-icon" />
        <span className="education-skill-label">{name}</span>
      </div>
    ))}
  </div>
</div>

          {/* Bottom Right: Spline */}
          <div className="education-spline-bottom">
            <Spline scene="https://prod.spline.design/eu8R-1UIG9FnFQm1/scene.splinecode" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Education;
