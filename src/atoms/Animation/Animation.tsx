import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Animation = ({
  x,
  y,
  children,
}: {
  children: ReactNode;
  x?: number;
  y?: number;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, x: x ?? 0, y: y ?? 0 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
