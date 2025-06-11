import React from 'react';
import { motion } from 'framer-motion';

interface LoadingRoseProps {
    onLoadingComplete: () => void;
  }
  
  const LoadingRose: React.FC<LoadingRoseProps> = ({ onLoadingComplete }) => {
  return (
  <motion.div 
      className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 7.5 }}
      onAnimationComplete={onLoadingComplete}
    >
         <div className="relative flex flex-col items-center justify-center h-screen">
         <div className="relative transform -translate-y-12">
        <svg 
          width="300" 
          height="400" 
          viewBox="0 0 300 400" 
          className="w-48 md:w-64"
        >
          {/* Enhanced Gradients */}
          <defs>
            <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1B4D2A" />
              <stop offset="50%" stopColor="#2D5A27" />
              <stop offset="100%" stopColor="#1B4D2A" />
            </linearGradient>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D5A27" />
              <stop offset="50%" stopColor="#3A7D44" />
              <stop offset="100%" stopColor="#2D5A27" />
            </linearGradient>
            <radialGradient id="petalGradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FF69B4" />
              <stop offset="50%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#DB7093" />
            </radialGradient>
            <radialGradient id="petalGradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FF1493" />
              <stop offset="35%" stopColor="#DB7093" />
              <stop offset="100%" stopColor="#C71585" />
            </radialGradient>
            <radialGradient id="petalGradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FFB6C1" />
              <stop offset="50%" stopColor="#FF69B4" />
              <stop offset="100%" stopColor="#FF1493" />
            </radialGradient>
          </defs>

          {/* Main Stem with enhanced natural curve */}
          <motion.path
            d="M150 400 C 150 400, 160 350, 155 300 S 140 200, 150 180"
            stroke="url(#stemGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Stem Details */}
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={`stem-detail-${i}`}
              d={`M${145 + Math.sin(i * 0.4) * 3} ${380 - i * 20} 
                  C ${145 + Math.sin(i * 0.4) * 3} ${380 - i * 20},
                    ${155 + Math.sin(i * 0.4) * 3} ${360 - i * 20},
                    ${150 + Math.sin((i + 1) * 0.4) * 3} ${340 - i * 20}`}
              stroke="#1B4D2A"
              strokeWidth="0.5"
              strokeOpacity="0.4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
            />
          ))}

          {/* Enhanced Thorns */}
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={`thorn-group-${i}`}>
              <motion.path
                d={`M${150 + (i % 2 ? 3 : -3)} ${350 - i * 35} 
                    Q ${i % 2 ? 170 : 130} ${345 - i * 35} ${150 + (i % 2 ? 3 : -3)} ${340 - i * 35}`}
                fill="#2D5A27"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2 + i * 0.2 }}
              />
            </React.Fragment>
          ))}

          {/* Enhanced Leaves with More Detail */}
          {[1, 2].map((_, i) => (
            <motion.g key={`leaf-${i}`}>
              <motion.path
                d={`M${150 + (i * 20 - 10)} ${320 - i * 50} 
                    C ${180 + (i * 20 - 10)} ${310 - i * 50},
                      ${200 + (i * 20 - 10)} ${290 - i * 50},
                      ${160 + (i * 20 - 10)} ${270 - i * 50}
                    C ${120 + (i * 20 - 10)} ${290 - i * 50},
                      ${130 + (i * 20 - 10)} ${310 - i * 50},
                      ${150 + (i * 20 - 10)} ${320 - i * 50}`}
                fill="url(#leafGradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 2.5 + i * 0.3 }}
              />
              {/* Enhanced leaf veins */}
              {[...Array(3)].map((_, j) => (
                <motion.path
                  key={`leaf-vein-${i}-${j}`}
                  d={`M${150 + (i * 20 - 10)} ${320 - i * 50}
                      C ${160 + (i * 20 - 10) + j * 5} ${300 - i * 50},
                        ${170 + (i * 20 - 10) + j * 5} ${280 - i * 50},
                        ${160 + (i * 20 - 10)} ${270 - i * 50}`}
                  stroke="#2D5A27"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 3 + i * 0.3 + j * 0.1 }}
                />
              ))}
            </motion.g>
          ))}

          {/* Enhanced Rose Center */}
          <motion.circle
            cx="150"
            cy="180"
            r="15"
            fill="url(#petalGradient2)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          />

          {/* Enhanced Inner Petals with More Natural Shape */}
          {[...Array(15)].map((_, i) => (
            <motion.path
              key={`inner-petal-${i}`}
              d={`M150 180 
                  C ${140 + Math.cos(i * Math.PI / 7.5) * 25} ${170 + Math.sin(i * Math.PI / 7.5) * 25},
                    ${130 + Math.cos(i * Math.PI / 7.5) * 35} ${160 + Math.sin(i * Math.PI / 7.5) * 35},
                    ${150 + Math.cos(i * Math.PI / 7.5) * 30} ${180 + Math.sin(i * Math.PI / 7.5) * 30}
                  C ${170 + Math.cos(i * Math.PI / 7.5) * 35} ${160 + Math.sin(i * Math.PI / 7.5) * 35},
                    ${160 + Math.cos(i * Math.PI / 7.5) * 25} ${170 + Math.sin(i * Math.PI / 7.5) * 25},
                    150 180`}
              fill="url(#petalGradient1)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.8 + i * 0.1 }}
            />
          ))}

          {/* Enhanced Middle Layer Petals */}
          {[...Array(18)].map((_, i) => (
            <motion.path
              key={`middle-petal-${i}`}
              d={`M150 180 
                  C ${140 + Math.cos(i * Math.PI / 9) * 35} ${170 + Math.sin(i * Math.PI / 9) * 35},
                    ${130 + Math.cos(i * Math.PI / 9) * 45} ${160 + Math.sin(i * Math.PI / 9) * 45},
                    ${150 + Math.cos(i * Math.PI / 9) * 40} ${180 + Math.sin(i * Math.PI / 9) * 40}
                  C ${170 + Math.cos(i * Math.PI / 9) * 45} ${160 + Math.sin(i * Math.PI / 9) * 45},
                    ${160 + Math.cos(i * Math.PI / 9) * 35} ${170 + Math.sin(i * Math.PI / 9) * 35},
                    150 180`}
              fill="url(#petalGradient3)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.8, delay: 4 + i * 0.1 }}
            />
          ))}

          {/* Enhanced Outer Petals with More Complex Shape */}
          {[...Array(21)].map((_, i) => (
            <motion.path
              key={`outer-petal-${i}`}
              d={`M150 180 
                  C ${140 + Math.cos(i * Math.PI / 10.5) * 45} ${170 + Math.sin(i * Math.PI / 10.5) * 45},
                    ${130 + Math.cos(i * Math.PI / 10.5) * 60} ${160 + Math.sin(i * Math.PI / 10.5) * 60},
                    ${150 + Math.cos(i * Math.PI / 10.5) * 55} ${180 + Math.sin(i * Math.PI / 10.5) * 55}
                  C ${170 + Math.cos(i * Math.PI / 10.5) * 60} ${160 + Math.sin(i * Math.PI / 10.5) * 60},
                    ${160 + Math.cos(i * Math.PI / 10.5) * 45} ${170 + Math.sin(i * Math.PI / 10.5) * 45},
                    150 180`}
              fill="url(#petalGradient2)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 4.2 + i * 0.1 }}
            />
          ))}

          {/* Enhanced Dew Drops */}
          {[...Array(12)].map((_, i) => (
            <motion.g key={`dewdrop-${i}`}>
              <motion.circle
                cx={140 + Math.random() * 20}
                cy={160 + Math.random() * 40}
                r="1.5"
                fill="white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.9, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 5 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
              />
              <motion.circle
                cx={140 + Math.random() * 20}
                cy={160 + Math.random() * 40}
                r="0.8"
                fill="white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 5.2 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
              />
            </motion.g>
          ))}
        </svg>

        {/* Loading Text with Reveal Animation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-8">
          <motion.div
            className="overflow-hidden whitespace-nowrap"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 5 }}
          >
            <motion.p
              className="text-2xl text-pink-500 font-dancing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 5 }}
            >
              Loading something special...
            </motion.p>
          </motion.div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default LoadingRose;