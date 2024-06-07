import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/theme/theme_context";

const HalfCircleProgress = ({
  percentage = 51,
  width = "60%",
  height = "auto",
  strokeWidth = 4,
  radius = 15,
  animationDuration = 1000, // Default animation duration in milliseconds
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const circumference = Math.PI * (radius - strokeWidth / 2) * 2;
  const framesPerSecond = 60; // Number of frames per second for smooth animation
  const { isDark } = useThemeContext();
  useEffect(() => {
    let animationFrameId: number;
    let start = 0;
    const totalFrames = Math.ceil((animationDuration / 1000) * framesPerSecond);
    const step = () => {
      if (start <= percentage) {
        setCurrentPercentage(start);
        start += percentage / totalFrames;
        animationFrameId = requestAnimationFrame(step);
      }
    };
    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [percentage, animationDuration]);

  return (
    <div style={{ width, height }} className=" mx-auto">
      <svg
        viewBox={`0 0 ${2 * radius} ${radius}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="#4caf50"
          strokeWidth={strokeWidth}
          strokeDasharray={`${
            (currentPercentage / 100) * circumference
          } ${circumference}`}
          transform={`rotate(180 ${radius} ${radius}) rotate(-90 ${radius} ${radius})`}
        />
        <text
          x="50%"
          y="80%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={`${radius / 4}px`}
          fill={`${isDark ? "white" : "#333"}`}
          fontWeight={300}
          className="font-size-20"
        >
          {Math.round(currentPercentage)}%
        </text>
      </svg>
    </div>
  );
};

export default HalfCircleProgress;
