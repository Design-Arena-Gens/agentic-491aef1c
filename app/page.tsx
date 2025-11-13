'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import CharacterCard from './components/CharacterCard'
import CharacterModal from './components/CharacterModal'
import { characters } from './data/characters'
import { Character } from './types/character'

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('All')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All')

  const roles = ['All', ...Array.from(new Set(characters.map(c => c.role)))]
  const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert']

  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           character.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           character.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'All' || character.role === roleFilter
      const matchesDifficulty = difficultyFilter === 'All' || character.difficulty === difficultyFilter

      return matchesSearch && matchesRole && matchesDifficulty
    })
  }, [searchQuery, roleFilter, difficultyFilter])

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCharacter(null), 300)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 px-4 text-center"
      >
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          Character Showcase
        </motion.h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Discover detailed guides, abilities, and strategies for all your favorite game characters
        </p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
          />
        </motion.div>
      </motion.section>

      {/* Filters */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4 pb-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className="flex gap-2 items-center">
            <span className="text-slate-400 font-semibold">Role:</span>
            <div className="flex gap-2 flex-wrap">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    roleFilter === role
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-slate-400 font-semibold">Difficulty:</span>
            <div className="flex gap-2 flex-wrap">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setDifficultyFilter(difficulty)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    difficultyFilter === difficulty
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Character Grid */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CharacterCard
                  character={character}
                  onClick={() => handleCharacterClick(character)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-slate-400">No characters found</p>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-4 pb-20 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700">
            <div className="text-4xl font-bold text-purple-400 mb-2">{characters.length}</div>
            <div className="text-slate-400">Characters</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700">
            <div className="text-4xl font-bold text-blue-400 mb-2">{roles.length - 1}</div>
            <div className="text-slate-400">Roles</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700">
            <div className="text-4xl font-bold text-pink-400 mb-2">
              {characters.reduce((sum, c) => sum + c.abilities.length, 0)}
            </div>
            <div className="text-slate-400">Abilities</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {characters.reduce((sum, c) => sum + c.fanArt.length, 0)}
            </div>
            <div className="text-slate-400">Fan Arts</div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800 py-8 px-4 text-center">
        <p className="text-slate-400">
          Built with Next.js, React, Tailwind CSS, and Framer Motion
        </p>
        <p className="text-slate-500 text-sm mt-2">
          © 2025 Character Showcase. Community-driven character guides and tutorials.
        </p>
      </footer>

      {/* Character Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  )
}
