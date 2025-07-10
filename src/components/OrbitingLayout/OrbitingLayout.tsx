import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./ElectronOrbit.scss";


const icons = [
    "x", "X", "aGitAlt", "FaHtml5" ];

const ElectronOrbit = () => {
     const { scrollYProgress } = useScroll();
  const rotateTransforms = icons.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [0, 360 + index * 180])
  );
  return (
    <div className="atom">
      <div className="nucleus">🌟</div>
      {icons.map((string, index) => (
        <motion.div
          key={index}
          className={`orbit orbit-${index}`}
          style={{ rotate: rotateTransforms[index] }}
        >
          <div className="electron">
            {string}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ElectronOrbit;