import React from "react";

function Confetti() {
  const confettiCount = 30;
  const confettis = Array.from({ length: confettiCount });

  return (
    <div className="confetti-container">
      {confettis.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
          backgroundColor:
            Math.random() > 0.5 ? "var(--brand-teal)" : "var(--brand-red)",
          transform: `rotate(${Math.random() * 360}deg)`,
        };
        return <div key={i} className="confetti" style={style} />;
      })}
    </div>
  );
}

export default Confetti;
