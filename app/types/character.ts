export interface Character {
  id: string
  name: string
  title: string
  role: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  description: string
  abilities: Ability[]
  strengths: string[]
  weaknesses: string[]
  lore: string
  tips: string[]
  counters: string[]
  synergies: string[]
  imageColor: string
  fanArt: FanArt[]
}

export interface Ability {
  name: string
  type: 'Passive' | 'Active' | 'Ultimate'
  cooldown?: string
  description: string
}

export interface FanArt {
  id: string
  artist: string
  imageUrl: string
  characterId: string
  likes: number
}
