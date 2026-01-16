import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./projects.css";

import placeholderImg from "../assets/Vtech.jpg"; 

const projectData = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio built with React and CSS.",
    image: placeholderImg,
    link: "https://github.com/yourusername/portfolio", 
  },
  {
    title: "Weather Dashboard",
    description: "A dynamic weather app using OpenWeather API.",
    image: placeholderImg,
    link: "https://google.com", 
  },
  {
    title: "Task Manager",
    description: "A productivity tool with drag-and-drop features.",
    image: placeholderImg,
    link: "", 
  },
  {
    title: "E-Commerce Store",
    description: "Full-stack store with payment integration.",
    image: placeholderImg,
    link: "https://amazon.com",
  },
  {
    title: "Chat Application",
    description: "Real-time messaging using Socket.io.",
    image: placeholderImg,
    link: "", 
  },
];

function Projects() {
  return (
    <div className="projects-section">
      <div className="projects-container">
        
        <h2 className="projects-main-title">Projects</h2>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          // CHANGE: Starts the slider at index 2 (the 3rd card, which is the middle of 5)
          initialSlide={2} 
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }} 
          modules={[EffectCoverflow, Pagination]}
          className="swiper_container"
        >
          {projectData.map((project, index) => {
            const CardWrapper = project.link ? "a" : "div";
            
            return (
              <SwiperSlide key={index}>
                <CardWrapper 
                  href={project.link || undefined}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  className={`project-card ${project.link ? "clickable" : ""}`}
                >
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-image" />
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                </CardWrapper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Projects;