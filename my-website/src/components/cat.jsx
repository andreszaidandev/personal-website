import React, { useState, useEffect, useRef } from 'react';
import './cat.css';

// ... (Keep your SpritePlayer component exactly as it is) ...
const SpritePlayer = ({ 
  src, 
  frameWidth, 
  frameHeight, 
  frameCount, 
  fps = 10, 
  loop = true, 
  onFinish = null, 
  scale = 1,
  onClick
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setFrame(0);
  }, [src]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrame((prevFrame) => {
        const nextFrame = prevFrame + 1;
        if (nextFrame >= frameCount) {
          if (loop) {
            return 0; 
          } else {
            if (onFinish) onFinish(); 
            return frameCount - 1;    
          }
        }
        return nextFrame;
      });
    }, 1000 / fps);

    return () => clearInterval(intervalId);
  }, [fps, frameCount, loop, onFinish, src]);

  const spriteStyle = {
    width: `${frameWidth}px`,
    height: `${frameHeight}px`,
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `-${frame * frameWidth}px 0px`,
    imageRendering: 'pixelated',
    transform: `scale(${scale})`,
    transformOrigin: 'bottom left', // CHANGED: Scales up from the corner
    cursor: 'pointer' 
  };

  return <div style={spriteStyle} onClick={onClick} />;
};


// --- MAIN COMPONENT ---
// Imports... (Assuming your imports are the same)
import idleImg from '../assets/IdleCat.png';
import sleepImg from '../assets/toSleep.png';
import wakeImg from '../assets/wakeUp.png';

function Cat() {
  const [catState, setCatState] = useState('IDLE');
  
  // NEW: State to track screen size for mobile scaling
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const inactivityTimer = useRef(null);

  const resetTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    if (catState === 'IDLE') {
      inactivityTimer.current = setTimeout(() => {
        setCatState('SLEEPING');
      }, 5000); 
    }
  };

  // 1. UPDATED: Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. UPDATED: Event Listeners for Mobile & Desktop
  useEffect(() => {
    // We bind to both mousemove (desktop) and touchstart (mobile)
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('keydown', resetTimer); // Bonus: typing keeps him awake
    
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [catState]); 

  const handleCatClick = () => {
    if (catState === 'SLEEPING') {
      setCatState('WAKING');
    }
  };

  const handleAnimationFinish = () => {
    if (catState === 'WAKING') {
      setCatState('IDLE');
    }
  };

  const spriteConfig = {
    IDLE: { src: idleImg, frames: 11, loop: true },
    SLEEPING: { src: sleepImg, frames: 4, loop: false },
    WAKING: { src: wakeImg, frames: 4, loop: false }
  };

  const currentConfig = spriteConfig[catState];

  return (
    // Note: We removed the .root container wrapper here so the cat 
    // can sit on top of whatever else is on your website.
    <div className="cat-container">
      <SpritePlayer
        key={catState}
        src={currentConfig.src}
        frameCount={currentConfig.frames}
        loop={currentConfig.loop}
        onFinish={handleAnimationFinish} 
        onClick={handleCatClick}
        frameWidth={32} 
        frameHeight={32}
        // 3. UPDATED: Dynamic Scale based on device
        scale={isMobile ? 4 : 8} 
        fps={8}
      />
    </div>
  );
}

export default Cat;