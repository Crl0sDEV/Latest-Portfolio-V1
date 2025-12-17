"use client";

import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

export default function SnowEffect() {
  const [isDecember, setIsDecember] = useState(false);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    
    if (month === 11) {
      setIsDecember(true);
    }
  }, []);

  if (!isDecember) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      <Snowfall 
        snowflakeCount={100}
        color="white"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}