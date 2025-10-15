import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./ElectronOrbit.scss";
import {icons } from "@/assets/icons"
import Image from "next/image";

const ElectronOrbit = ({children}: {children: ReactNode}) => {
     const { scrollYProgress } = useScroll();
  const rotateTransforms = icons.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [0, 360 + index * 180])
  );
  return (
    <div className="atom">
      <div className="nucleus">{children}</div>
      {icons.slice(0,3).map((string, index) => (
        <motion.div
          key={index}
          className={`orbit orbit-${index}`}
          style={{ rotate: rotateTransforms[index] }}
        >
          <div className="electron">
            <Image src={string} height={50} width={50} alt="string" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ElectronOrbit;