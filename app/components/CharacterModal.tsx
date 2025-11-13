'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Character } from '../types/character'
import { useState } from 'react'

interface CharacterModalProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export default function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  const [activeTab, setActiveTab] = useState<'abilities' | 'guide' | 'fanart'>('abilities')

  if (!character) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className={`relative bg-gradient-to-br ${character.imageColor} p-8 rounded-t-3xl`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-black/30 rounded-full text-xs font-semibold text-white mb-3">
                    {character.role}
                  </span>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {character.name}
                  </h2>
                  <p className="text-xl text-white/90 italic mb-4">
                    {character.title}
                  </p>
                  <p className="text-white/80">
                    {character.description}
                  </p>
                </div>

                <div className="bg-black/30 px-4 py-2 rounded-lg text-center">
                  <div className="text-xs text-white/70">Difficulty</div>
                  <div className="text-lg font-bold text-white">{character.difficulty}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700">
              <button
                onClick={() => setActiveTab('abilities')}
                className={`flex-1 py-4 font-semibold transition-colors ${
                  activeTab === 'abilities'
                    ? 'text-white bg-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                Abilities
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 font-semibold transition-colors ${
                  activeTab === 'guide'
                    ? 'text-white bg-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                Strategy Guide
              </button>
              <button
                onClick={() => setActiveTab('fanart')}
                className={`flex-1 py-4 font-semibold transition-colors ${
                  activeTab === 'fanart'
                    ? 'text-white bg-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                Fan Art ({character.fanArt.length})
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'abilities' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Abilities</h3>
                    <div className="space-y-4">
                      {character.abilities.map((ability, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-700/50 rounded-xl p-4 hover:bg-slate-700 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-bold text-white">{ability.name}</h4>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                                ability.type === 'Ultimate' ? 'bg-yellow-500 text-black' :
                                ability.type === 'Active' ? 'bg-blue-500 text-white' :
                                'bg-green-500 text-white'
                              }`}>
                                {ability.type}
                              </span>
                            </div>
                            {ability.cooldown && (
                              <span className="text-sm text-slate-300 bg-slate-800 px-3 py-1 rounded-full">
                                CD: {ability.cooldown}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300">{ability.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Lore</h3>
                    <p className="text-slate-300 leading-relaxed bg-slate-700/30 p-4 rounded-xl italic">
                      {character.lore}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'guide' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-green-400">✓</span> Strengths
                    </h3>
                    <ul className="space-y-2">
                      {character.strengths.map((strength, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-slate-300 flex items-start gap-2"
                        >
                          <span className="text-green-400 mt-1">•</span>
                          <span>{strength}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-red-400">✗</span> Weaknesses
                    </h3>
                    <ul className="space-y-2">
                      {character.weaknesses.map((weakness, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-slate-300 flex items-start gap-2"
                        >
                          <span className="text-red-400 mt-1">•</span>
                          <span>{weakness}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">💡 Pro Tips</h3>
                    <div className="space-y-3">
                      {character.tips.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-slate-300"
                        >
                          <span className="font-semibold text-blue-400">Tip {index + 1}:</span> {tip}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">🛡️ Counters</h3>
                      <div className="space-y-2">
                        {character.counters.map((counter, index) => (
                          <div
                            key={index}
                            className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-sm text-slate-300"
                          >
                            {counter}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">🤝 Synergies</h3>
                      <div className="space-y-2">
                        {character.synergies.map((synergy, index) => (
                          <div
                            key={index}
                            className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-sm text-slate-300"
                          >
                            {synergy}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'fanart' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Community Fan Art</h3>
                  {character.fanArt.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {character.fanArt.map((art, index) => (
                        <motion.div
                          key={art.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors"
                        >
                          <div className="aspect-video bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                            <span className="text-slate-400 text-sm">Art Preview</span>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-semibold">By {art.artist}</span>
                              <span className="text-slate-400 text-sm">❤️ {art.likes}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      <p>No fan art yet. Be the first to submit!</p>
                    </div>
                  )}

                  <div className="bg-slate-700/30 rounded-xl p-6 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">Submit Your Art</h4>
                    <p className="text-slate-300 mb-4">
                      Have artwork of {character.name}? Share it with the community!
                    </p>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-shadow">
                      Upload Fan Art
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
