import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!noButtonRef.current || !containerRef.current) return;

      const button = noButtonRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const buttonX = button.left + button.width / 2;
      const buttonY = button.top + button.height / 2;

      const distance = Math.hypot(mouseX - buttonX, mouseY - buttonY);

      if (distance < 100) {
        // Move away from the cursor
        let offsetX = (buttonX - mouseX) * 1.5;
        let offsetY = (buttonY - mouseY) * 1.5;

        // Calculate new position
        let newX = buttonPosition.current.x + offsetX;
        let newY = buttonPosition.current.y + offsetY;

        // Keep button inside the screen
        const maxX = container.width / 2 - button.width / 2;
        const maxY = container.height / 2 - button.height / 2;
        newX = Math.max(-maxX, Math.min(maxX, newX));
        newY = Math.max(-maxY, Math.min(maxY, newY));

        // Apply new position
        buttonPosition.current = { x: newX, y: newY };
        noButtonRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-screen bg-pink-200 overflow-hidden relative"
    >
      {accepted && <Confetti />}
      <div className="text-center p-6 bg-white shadow-2xl rounded-xl max-w-lg relative">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Will you be my Valentine? 💖
        </h1>
        <div className="flex justify-center space-x-4 mt-6 relative">
          <motion.button
            onClick={() => setAccepted(true)}
            className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-red-600 transition"
            whileTap={{ scale: 0.9 }}
          >
            Yes 💘
          </motion.button>
          <button
            ref={noButtonRef}
            className="bg-gray-400 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition absolute"
            style={{ transform: "translate(0, 0)", transition: "transform 0.2s ease-out" }}
          >
            No 💔
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
