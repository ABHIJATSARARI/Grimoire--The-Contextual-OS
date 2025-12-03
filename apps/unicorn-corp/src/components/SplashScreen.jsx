import { useEffect } from 'react';
import './SplashScreen.css';

function SplashScreen({ onComplete }) {
  useEffect(() => {
    // Auto-complete after video ends (6 seconds)
    const timer = setTimeout(onComplete, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      {/* Solid black background */}
      <div className="splash-background" />
      
      {/* Splash video - full screen */}
      <video 
        className="splash-video" 
        autoPlay 
        muted 
        playsInline
        onEnded={onComplete}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Logo branding - bottom right corner */}
      <div className="splash-branding">
        <img src="/logo.png" alt="Grimoire" className="brand-logo" />
      </div>
    </div>
  );
}

export default SplashScreen;
