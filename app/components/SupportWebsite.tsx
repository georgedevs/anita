'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Volume2, VolumeX } from 'lucide-react';

const LoveWebsite = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [secondLetterIndex, setSecondLetterIndex] = useState(0);
  const [showLoadingText, setShowLoadingText] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const firstMessage = "Hey Anjie";
  const secondMessage = "I think you're beautiful";

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    const handleScroll = () => setScrollY(window.scrollY);
    
    // Initialize window size
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Start loading animation
    const loadingTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingTimer);
          setShowLoadingText(false);
          // Start the letter animation after loading completes
          setTimeout(() => {
            setShowMessage(true);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // First message letter animation
  useEffect(() => {
    if (showMessage && currentLetterIndex < firstMessage.length) {
      const timer = setTimeout(() => {
        setCurrentLetterIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else if (currentLetterIndex >= firstMessage.length && !showSecondMessage) {
      // Start second message after first is complete
      const timer = setTimeout(() => {
        setShowSecondMessage(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showMessage, currentLetterIndex, firstMessage.length, showSecondMessage]);

  // Second message letter animation
  useEffect(() => {
    if (showSecondMessage && secondLetterIndex < secondMessage.length) {
      const timer = setTimeout(() => {
        setSecondLetterIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSecondMessage, secondLetterIndex, secondMessage.length]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 font-dancing overflow-hidden">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="/relaxing-background-music.mp3"  
      />
      
      {/* Music Control Button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-4 rounded-full bg-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-red-500" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-500" />
        )}
      </motion.button>

      {/* Floating backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating hearts */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="text-red-300 w-6 h-6" />
          </motion.div>
        ))}

        {/* Sparkles */}
        {windowSize.width > 0 && [...Array(25)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{ 
              x: Math.random() * windowSize.width, 
              y: Math.random() * windowSize.height 
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.9, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="text-pink-200 w-4 h-4" />
          </motion.div>
        ))}

        {/* Stars */}
        {windowSize.width > 0 && [...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            initial={{ 
              x: Math.random() * windowSize.width, 
              y: Math.random() * windowSize.height 
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star className="text-yellow-200 w-3 h-3" />
          </motion.div>
        ))}
      </div>

      {/* Main Content - Centered */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div 
          className="text-center"
          style={parallaxStyle}
        >
          {/* Loading Animation */}
          <AnimatePresence>
            {showLoadingText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Loading Text */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-4xl text-gray-600 mb-8"
                >
                  Preparing something special...
                </motion.div>

                {/* Loading Bar Container */}
                <div className="w-80 md:w-96 mx-auto">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Loading Percentage */}
                  <motion.div
                    className="text-lg text-gray-500 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {loadingProgress}%
                  </motion.div>
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-pink-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* First Message - Hey Anita */}
          <AnimatePresence>
            {!showLoadingText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8 pb-2"
              >
                <div className="text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 font-bold pb-6 mb-2">
                  {firstMessage.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50, scale: 0.5 }}
                      animate={{ 
                        opacity: index < currentLetterIndex ? 1 : 0,
                        y: index < currentLetterIndex ? 0 : 50,
                        scale: index < currentLetterIndex ? 1 : 0.5,
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeOut",
                        delay: index * 0.1
                      }}
                      className="inline-block"
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Second Message - I think you're beautiful */}
          <AnimatePresence>
            {showSecondMessage && !showLoadingText && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-4xl lg:text-5xl text-gray-700 max-w-4xl mx-auto"
              >
                {secondMessage.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: index < secondLetterIndex ? 1 : 0,
                      y: index < secondLetterIndex ? 0 : 20,
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut",
                      delay: index * 0.05
                    }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative elements that appear after text is complete */}
          <AnimatePresence>
            {secondLetterIndex >= secondMessage.length && !showLoadingText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-12 flex justify-center space-x-6"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="text-red-500 w-12 h-12" />
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                >
                  <Sparkles className="text-pink-400 w-10 h-10" />
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                >
                  <Heart className="text-red-500 w-12 h-12" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LoveWebsite;