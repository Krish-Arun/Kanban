import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const spring = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedItemCard({ item }) {
  const ref = useRef(null);

  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const scale = useSpring(1, spring);
  const opacity = useSpring(0);
  const rotateCaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const offX = e.clientX - rect.left - rect.width / 2;
    const offY = e.clientY - rect.top - rect.height / 2;

    const rX = (offY / (rect.height / 2)) * -12;
    const rY = (offX / (rect.width / 2)) * 12;

    rotateX.set(rX);
    rotateY.set(rY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velY = offY - lastY;
    rotateCaption.set(-velY * 0.6);
    setLastY(offY);
  }

  function handleEnter() {
    scale.set(1.1);
    opacity.set(1);
  }

  function handleLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateCaption.set(0);
  }

  return (
    <div className="space-y-3">
      {/* Clickable tilt figure */}
      <figure
        ref={ref}
        className="relative [perspective:800px] cursor-pointer"
        style={{ width: "100%", height: "220px" }}
        onMouseMove={handleMouse}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <Link to={`/item/${item._id}`}>
          <motion.div
            className="[transform-style:preserve-3d]"
            style={{
              width: "100%",
              height: "100%",
              rotateX,
              rotateY,
              scale,
            }}
          >
            {/* IMAGE */}
            <motion.img
              src={item.imageUrl}
              alt={item.name}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
              style={{
                willChange: "transform",
              }}
            />
          
            {/* NAME OVERLAY (always visible) */}
            <motion.div
              className="
                absolute bottom-3 left-3 
                bg-black/40 backdrop-blur-sm 
                text-white text-2xl font-semibold 
                px-2 py-1 rounded-md 
                pointer-events-none
              "
              style={{ zIndex: 10 }}
            >
              {item.name}
            </motion.div>
          
            {/* TOOLTIP (hover-following) */}
            <motion.div
              className="pointer-events-none absolute left-2 top-2 text-sm bg-black/60 text-white px-2 py-1 rounded opacity-0"
              style={{ x, y, opacity, rotate: rotateCaption }}
            >
              {item.name}
            </motion.div>
          </motion.div>

        </Link>
      </figure>

      {/* Category + Rating */}
      <div className="flex items-center justify-between">
        <Badge className="bg-blue-700">{item.category}</Badge>
        <span className="text-yellow-400">⭐ {item.averageRating?.toFixed(1) || "—"}</span>
      </div>

      {/* Name */}
      <Link to={`/item/${item._id}`}>
        <h2 className="text-lg font-semibold hover:underline">{item.name}</h2>
      </Link>
    </div>
  );
}
