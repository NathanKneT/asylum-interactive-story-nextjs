'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StoryNode } from '@/types/story';

interface StoryViewerProps {
  node: StoryNode;
  onChoiceSelect: (choiceId: string) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ 
  node, 
  onChoiceSelect 
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Version simplifiée pour le SSR
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {node.title}
        </h1>
        <div 
          className="prose prose-lg prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: node.content }}
        />
        <div className="space-y-4">
          {node.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoiceSelect(choice.id)}
              className="w-full p-4 text-left bg-gray-700 hover:bg-red-500 
                       text-white rounded-lg transition-all duration-200 
                       border border-gray-600 hover:border-red-500
                       focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <span className="font-medium">{choice.text}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl"
    >
      {/* Titre de la scène */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white mb-6 text-center"
      >
        {node.title}
      </motion.h1>

      {/* Contenu de l'histoire */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="prose prose-lg prose-invert max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: node.content }}
      />

      {/* Choix disponibles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        {node.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: '#e94560' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoiceSelect(choice.id)}
            className="w-full p-4 text-left bg-gray-700 hover:bg-red-500 
                     text-white rounded-lg transition-all duration-200 
                     border border-gray-600 hover:border-red-500
                     focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <span className="font-medium">{choice.text}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};