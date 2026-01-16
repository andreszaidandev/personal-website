import React, { useState, useEffect, useRef } from 'react';
import './cat.css';

// --- SPRITE PLAYER (Unchanged) ---
const SpritePlayer = ({ 
  src, frameWidth, frameHeight, frameCount, fps = 10, loop = true, 
  onFinish = null, scale = 1, onClick
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => { setFrame(0); }, [src]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrame((prevFrame) => {
        const nextFrame = prevFrame + 1;
        if (nextFrame >= frameCount) {
          if (loop) return 0;
          else {
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
    transformOrigin: 'bottom left',
    cursor: 'pointer' 
  };

  return <div style={spriteStyle} onClick={onClick} />;
};

// --- MAIN COMPONENT ---
import idleImg from '../assets/IdleCat.png';
import sleepImg from '../assets/toSleep.png';
import wakeImg from '../assets/wakeUp.png';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

function Cat() {
  const [catState, setCatState] = useState('IDLE');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // NEW: Visibility State
  const [isVisible, setIsVisible] = useState(false);
  
  // NEW: Ref to store user input history
  const keyHistory = useRef([]);

  const inactivityTimer = useRef(null);

  // 1. Logic to Reset Sleep Timer
  const resetTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (catState === 'IDLE' && isVisible) {
      inactivityTimer.current = setTimeout(() => {
        setCatState('SLEEPING');
      }, 5000); 
    }
  };

  // 2. Logic to detect Konami Code
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Add new key to history
      keyHistory.current = [...keyHistory.current, e.key];

      // Keep history only as long as the code (optimization)
      if (keyHistory.current.length > KONAMI_CODE.length) {
        keyHistory.current.shift();
      }

      // Check if history matches code
      if (JSON.stringify(keyHistory.current) === JSON.stringify(KONAMI_CODE)) {
        setIsVisible(prev => !prev);
        // Optional: Reset history so typing 'a' again doesn't re-trigger immediately
        keyHistory.current = []; 
      }
      
      // Also trigger the "wake up/stay awake" timer on keypress
      resetTimer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]); // Re-bind if visibility changes


  // 3. Standard Layout/Resize Effects
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    // Listeners for activity (only relevant if cat is visible)
    if (isVisible) {
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('touchstart', resetTimer);
      resetTimer(); // Start timer immediately when he appears
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [catState, isVisible]); 

  const handleCatClick = () => {
    if (catState === 'SLEEPING') setCatState('WAKING');
  };

  const handleAnimationFinish = () => {
    if (catState === 'WAKING') setCatState('IDLE');
  };

  // If the code hasn't been entered, render nothing!
  if (!isVisible) return null;

  const spriteConfig = {
    IDLE: { src: idleImg, frames: 11, loop: true },
    SLEEPING: { src: sleepImg, frames: 4, loop: false },
    WAKING: { src: wakeImg, frames: 4, loop: false }
  };

  const currentConfig = spriteConfig[catState];

  return (
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
        scale={isMobile ? 4 : 8} 
        fps={8}
      />
    </div>
  );
}

export default Cat;