import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 aged-paper flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Vintage Newspaper Loading */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Spinning Newspaper Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-8 border-foreground mx-auto relative"
          >
            <div className="absolute inset-2 border-4 border-foreground">
              <div className="absolute inset-1">
                <div className="h-1 bg-foreground mb-1"></div>
                <div className="h-1 bg-foreground mb-1"></div>
                <div className="h-1 bg-foreground mb-1"></div>
                <div className="h-1 bg-foreground"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Newspaper Masthead */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="border-t-4 border-b-4 border-double border-foreground py-4">
              <h1 className="newspaper-masthead text-4xl md:text-6xl">
                THE DEVELOPER
              </h1>
              <div className="newspaper-subhead text-lg mt-2">
                "All The Code That's Fit To Print"
              </div>
            </div>
            
            <div className="newspaper-byline">
              LOADING PORTFOLIO EDITION...
            </div>
          </motion.div>
          
          {/* Loading Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <div className="brutalist-border p-4 max-w-md mx-auto">
              <div className="newspaper-byline mb-2">PROGRESS</div>
              <div className="border-2 border-foreground h-4 relative">
                <motion.div
                  className="h-full bg-foreground"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </div>
            </div>
            
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="newspaper-body"
            >
              Preparing latest edition of portfolio showcase...
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;