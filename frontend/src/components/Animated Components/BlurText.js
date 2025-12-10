import { motion } from "framer-motion";

const BlurText = ({
  text = "",
  delay = 100,
  className = "",
  animateBy = "words",
  stepDuration = 0.35,
  easing = t => t,
  onAnimationComplete,
  start = true,
  color = "black"
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const defaultFrom = {
    filter: "blur(10px)",
    opacity: 0,
    y: 0,
    color
  };

  const defaultTo = [
    { filter: "blur(5px)", opacity: 0.5, y: 0, color },
    { filter: "blur(0px)", opacity: 1, y: 0, color }
  ];

  const stepCount = defaultTo.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const buildKeyframes = (from, steps) => {
    const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
    const keyframes = {};
    keys.forEach(k => {
      keyframes[k] = [from[k], ...steps.map(s => s[k])];
    });
    return keyframes;
  };

  const animateKeyframes = buildKeyframes(defaultFrom, defaultTo);

  return (
    <p
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center", 
        gap: "0.05em",
        margin: 0
      }}
    >
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          className="blur-text-char"
          style={{ letterSpacing: "-0.5px" }}
          initial={defaultFrom}
          animate={start ? animateKeyframes : defaultFrom}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing
          }}
          onAnimationComplete={
            start && index === elements.length - 1 ? onAnimationComplete : undefined
          }
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
