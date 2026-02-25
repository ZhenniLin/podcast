import { Level, Topic, PodcastItem } from "@/lib/podcast-data"

export type ScreenName =
  | "home"
  | "login"
  | "select-language"
  | "select-level"
  | "select-topic"
  | "topic-hub"
  | "player"
  | "daily-recommendation"
  | "profile"

export type Language = "English" | "Spanish"

export interface AppState {
  currentScreen: ScreenName
  previousScreen: ScreenName | null
  isLoggedIn: boolean  // Added auth state
  chosenLanguage: Language | null
  chosenLevel: Level | null
  chosenTopic: Topic | null
  playQueue: PodcastItem[]
  lastPlayed: PodcastItem | null
  isPlaying: boolean
  favorites: string[] // IDs
  history: string[] // IDs
  streak: number
  xp: number
  playbackMode: "repeat" | "shuffle" | "list"
}

export interface AppActions {
  navigate: (screen: ScreenName) => void
  goBack: () => void
  setLanguage: (language: Language) => void
  setLevel: (level: Level) => void
  setTopic: (topic: Topic) => void
  login: () => void // Added login action
  playPodcast: (item: PodcastItem) => void
  togglePlay: () => void
  addToFavorites: (id: string) => void
  completePodcast: (xp: number) => void
  togglePlaybackMode: () => void
}
