import React from "react";

const inputRangeCustom = () => {
  return (
    <div className="h-6 w-1/4 flex flex-col justify-center items-center">
      <input
        className="w-3/4"
        onChange={(e) => console.log(e.target.value)}
        type="range"
        min={0}
        max={2}
        step={1}
      />
      <div className="w-3/4 flex justify-between fw-regular text-sm sm:text-xs md:text-sm text-slate-300">
        <span className="after:content-['B'] sm:after:content-['Bajo']" />
        <span className="after:content-['M'] sm:after:content-['Medio']" />
        <span className="after:content-['A'] sm:after:content-['Alto']" />
      </div>
    </div>
  );
};

export default inputRangeCustom;
