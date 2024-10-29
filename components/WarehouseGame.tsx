import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Box, Timer, Package, Truck, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

const itemTypes = [
  { name: 'Electronics', color: 'bg-blue-500', icon: '📱' },
  { name: 'Clothing', color: 'bg-pink-500', icon: '👕' },
  { name: 'Food', color: 'bg-yellow-500', icon: '🍎' },
  { name: 'Books', color: 'bg-purple-500', icon: '📚' },
  { name: 'Toys', color: 'bg-green-500', icon: '🎮' }
];

const WarehouseGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [warehouseGrid, setWarehouseGrid] = useState([]);
  const [lastPickedCell, setLastPickedCell] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const targetScore = 500;

  const generateWarehouseGrid = () => {
    return Array.from({ length: 16 }, (_, i) => {
      const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      return {
        id: i,
        ...randomType,
        isActive: false
      };
    });
  };

  const generateOrder = () => {
    const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    return {
      ...randomType,
      quantity: Math.floor(Math.random() * 3) + 1,
      collected: 0
    };
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setWarehouseGrid(generateWarehouseGrid());
    setCurrentOrder(generateOrder());
  };

  const handleCellClick = (cell: any, index: number) => {
    if (!gameActive || !currentOrder) return;

    setLastPickedCell(index);

    if (cell.name === currentOrder.name) {
      setScore(prev => prev + 10);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 500);

      const newOrder = { ...currentOrder };
      newOrder.collected++;

      if (newOrder.collected >= newOrder.quantity) {
        setTimeout(() => {
          setCurrentOrder(generateOrder());
        }, 300);
      } else {
        setCurrentOrder(newOrder);
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  useEffect(() => {
    let timer: any;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl"
    >
      <motion.h1 
        className="text-3xl font-bold text-center mb-8 text-indigo-600"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        3PL Warehouse Pick & Pack Game
      </motion.h1>

      <div className="flex justify-between mb-6 bg-gray-50 p-4 rounded-lg">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-xl font-semibold">{score}</span>
        </motion.div>

        <motion.div 
          className="flex items-center space-x-2"
          animate={{ color: timeLeft < 10 ? '#ef4444' : '#000000' }}
        >
          <Timer className="w-6 h-6" />
          <span className="text-xl font-semibold">{timeLeft}s</span>
        </motion.div>
      </div>

      {!gameActive && (
        <motion.button
          onClick={startGame}
          className="w-full p-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Game
        </motion.button>
      )}

      <AnimatePresence>
        {gameActive && currentOrder && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="my-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg"
          >
            <div className="text-lg font-semibold mb-2">Current Order:</div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{currentOrder.icon}</span>
              <span className="text-lg">
                Pick {currentOrder.quantity - currentOrder.collected} {currentOrder.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-3">
        {warehouseGrid.map((cell: any, index) => (
          <motion.button
            key={cell.id}
            onClick={() => handleCellClick(cell, index)}
            className={clsx(
              cell.color,
              'p-4 rounded-lg text-white font-semibold h-24',
              'flex flex-col items-center justify-center',
              'transition-shadow hover:shadow-lg',
              !gameActive && 'opacity-50 cursor-not-allowed'
            )}
            whileHover={gameActive ? { scale: 1.05 } : {}}
            whileTap={gameActive ? { scale: 0.95 } : {}}
            disabled={!gameActive}
          >
            <span className="text-2xl mb-2">{cell.icon}</span>
            <span className="text-sm">{cell.name}</span>
            {lastPickedCell === index && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 0] }}
                transition={{ duration: 0.5 }}
                className="absolute"
              >
                {showSuccess ? 
                  <CheckCircle className="w-12 h-12 text-green-300" /> :
                  <Package className="w-12 h-12 text-red-300" />
                }
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {!gameActive && score > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center"
          >
            <div className="text-2xl font-bold mb-2">Game Over!</div>
            <div className="text-xl mb-4">Final Score: {score}</div>
            {score >= targetScore ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-600 font-semibold"
              >
                🎉 Congratulations! You beat the challenge! 🏆
              </motion.div>
            ) : (
              <div className="text-blue-600 font-semibold">
                Try again to beat {targetScore} points!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WarehouseGame;
