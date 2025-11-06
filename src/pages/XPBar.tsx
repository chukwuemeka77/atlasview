import React from "react";

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  animationXP?: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, maxXP, animationXP = 0 }) => {
  const percentage = Math.min(((currentXP + animationXP) / maxXP) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
      <span className="absolute left-1/2 top-0 transform -translate-x-1/2 text-sm font-semibold text-white">
        {currentXP + animationXP} / {maxXP} XP
      </span>
    </div>
  );
};

export default XPBar;
