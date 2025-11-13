'use client'

import { motion } from 'framer-motion'
import { Character } from '../types/character'

interface CharacterCardProps {
  character: Character
  onClick: () => void
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer relative overflow-hidden rounded-2xl shadow-2xl group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${character.imageColor} opacity-90`} />

      <div className="relative p-6 h-80 flex flex-col justify-between">
        <div>
          <motion.div
            className="inline-block px-3 py-1 bg-black/30 rounded-full text-xs font-semibold text-white mb-3"
            whileHover={{ scale: 1.1 }}
          >
            {character.role}
          </motion.div>

          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {character.name}
          </h3>

          <p className="text-sm text-white/90 italic mb-4 drop-shadow">
            {character.title}
          </p>
        </div>

        <div>
          <p className="text-white/80 text-sm mb-4 line-clamp-3">
            {character.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-white/70">
              Difficulty: <span className="font-bold text-white">{character.difficulty}</span>
            </span>

            <motion.div
              className="text-white font-semibold text-sm bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            >
              View Details →
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      />
    </motion.div>
  )
}
