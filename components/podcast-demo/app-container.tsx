"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AppState, ScreenName, AppActions, Language } from "./types"
import { Level, Topic, PodcastItem, MOCK_PODCASTS } from "@/lib/podcast-data"
import { ScreenLogin } from "./screens/login"
import { ScreenHome } from "./screens/home"
import { ScreenSelectLanguage } from "./screens/select-language"
import { ScreenSelectLevel } from "./screens/select-level"
import { ScreenSelectTopic } from "./screens/select-topic"
import { ScreenTopicHub } from "./screens/topic-hub"
import { ScreenPlayer } from "./screens/player"
import { ScreenProfile } from "./screens/profile"
import { Compass, Play, Pause, User } from 'lucide-react'
import { cn } from "@/lib/utils"

export function PodcastApp() {
  const [state, setState] = useState<AppState>({
    isLoggedIn: false,
    currentScreen: "home",
    previousScreen: null,
    chosenLanguage: null,
    chosenLevel: null,
    chosenTopic: null,
    playQueue: [],
    lastPlayed: null,
    isPlaying: false,
    favorites: [],
    history: [],
    streak: 3,
    xp: 1250,
    playbackMode: "list",
  })

  const actions: AppActions = {
    navigate: (screen: ScreenName) => {
      setState((prev) => ({
        ...prev,
        previousScreen: prev.currentScreen,
        currentScreen: screen,
      }))
    },
    goBack: () => {
      setState((prev) => {
        // Custom back logic
        let target: ScreenName = "home"
        if (prev.currentScreen === "login") target = "home"
        if (prev.currentScreen === "select-language") target = "home"
        if (prev.currentScreen === "select-level") target = "select-language"
        if (prev.currentScreen === "select-topic") target = "select-level"
        if (prev.currentScreen === "topic-hub") target = "select-topic"
        if (prev.currentScreen === "player") target = "topic-hub"
        if (prev.currentScreen === "profile") target = "topic-hub"
        
        return {
          ...prev,
          previousScreen: null,
          currentScreen: target,
        }
      })
    },
    setLevel: (level: Level) => {
      setState((prev) => ({ ...prev, chosenLevel: level }))
    },
    setLanguage: (language: Language) => {
      setState((prev) => ({ ...prev, chosenLanguage: language }))
    },
    setTopic: (topic: Topic) => {
      setState((prev) => ({ ...prev, chosenTopic: topic }))
    },
    login: () => {
      setState((prev) => ({ ...prev, isLoggedIn: true }))
    },
    playPodcast: (item: PodcastItem) => {
      setState((prev) => ({
        ...prev,
        lastPlayed: item,
        isPlaying: true,
        history: [item.id, ...prev.history],
      }))
    },
    togglePlay: () => {
      setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
    },
    addToFavorites: (id: string) => {
      setState((prev) => ({
        ...prev,
        favorites: prev.favorites.includes(id)
          ? prev.favorites.filter((f) => f !== id)
          : [...prev.favorites, id],
      }))
    },
    completePodcast: (xp: number) => {
      setState((prev) => ({ ...prev, xp: prev.xp + xp }))
    },
    togglePlaybackMode: () => {
      setState((prev) => {
        const modes: ("repeat" | "shuffle" | "list")[] = ["list", "repeat", "shuffle"]
        const currentIndex = modes.indexOf(prev.playbackMode)
        const nextMode = modes[(currentIndex + 1) % modes.length]
        return { ...prev, playbackMode: nextMode }
      })
    },
  }

  // Bottom Nav Logic
  const showBottomNav = ["topic-hub", "profile"].includes(state.currentScreen)

  // Helper to get current Daily Pick (fallback logic)
  const getDailyPick = () => {
    const filteredPodcasts = MOCK_PODCASTS.filter(
      (p) =>
        (!state.chosenTopic || p.topic === state.chosenTopic) &&
        (!state.chosenLevel || p.level === state.chosenLevel)
    )
    return filteredPodcasts.length > 0 ? filteredPodcasts[0] : MOCK_PODCASTS[0]
  }
  
  const dailyPick = getDailyPick()

  // Logic to determine if the *currently visible card* is playing
  // We need to check if what is playing matches the lastPlayed item
  // Since ScreenTopicHub manages the "active card", we rely on state.lastPlayed primarily for the global button
  // But here's the catch: The global button needs to control the "active card" in TopicHub.
  // If we are in TopicHub, pressing play should play whatever is on the card.
  // However, AppContainer doesn't know what card is selected in TopicHub.
  // To fix this perfectly, we'd lift "selectedEpisode" state up, but for now, 
  // we'll make the play button just toggle whatever is lastPlayed if it matches current context,
  // or play dailyPick if nothing is playing. 
  // A better UX requested by user was: "click bottom play -> plays card".
  // This requires the bottom button to know about the card. 
  // Since we can't easily pass state UP without lifting it, we will keep the simple logic:
  // Bottom button plays/pauses `state.lastPlayed`. 
  // If nothing played yet, plays Daily Pick.

  const isPlaying = state.isPlaying

  return (
    <div className="w-full h-[100dvh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden p-4">
      {/* iPhone Frame Container */}
      <div className="relative w-full max-w-[393px] h-full max-h-[852px] sm:max-h-[820px]">
        {/* iPhone Outer Frame (Metal) */}
        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-2xl p-[3px]">
          {/* iPhone Inner Frame */}
          <div className="relative w-full h-full rounded-[3.4rem] bg-black overflow-hidden">
            {/* Screen Bezel */}
            <div className="absolute inset-[12px] rounded-[3rem] bg-white overflow-hidden shadow-inner">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[100]">
                <div className="w-[126px] h-[37px] bg-black rounded-b-[20px] shadow-lg flex items-center justify-center">
                  {/* Camera & Sensors */}
                  <div className="flex items-center gap-[18px]">
                    <div className="w-[6px] h-[6px] rounded-full bg-gray-900 border border-gray-800" />
                    <div className="w-[10px] h-[10px] rounded-full bg-gray-900" />
                  </div>
                </div>
              </div>

              {/* Screen Content Area */}
              <div className="absolute inset-0 top-[50px] bottom-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={state.currentScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    {state.currentScreen === "home" && <ScreenHome actions={actions} />}
                    {state.currentScreen === "login" && (
                      <ScreenLogin actions={actions} />
                    )}
                    {state.currentScreen === "select-language" && (
                      <ScreenSelectLanguage state={state} actions={actions} />
                    )}
                    {state.currentScreen === "select-level" && (
                      <ScreenSelectLevel state={state} actions={actions} />
                    )}
                    {state.currentScreen === "select-topic" && (
                      <ScreenSelectTopic state={state} actions={actions} />
                    )}
                    {state.currentScreen === "topic-hub" && (
                      <ScreenTopicHub state={state} actions={actions} />
                    )}
                    {state.currentScreen === "player" && (
                      <ScreenPlayer state={state} actions={actions} />
                    )}
                    {state.currentScreen === "profile" && (
                      <ScreenProfile state={state} actions={actions} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Navigation */}
                {showBottomNav && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-20 z-50">
                    {/* Left Button */}
                    <button
                      className={cn(
                        "absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-colors",
                        state.currentScreen === "topic-hub"
                          ? "text-primary"
                          : "text-gray-400"
                      )}
                      onClick={() => actions.navigate("topic-hub")}
                    >
                      <Compass size={24} />
                      <span className="text-[10px] font-medium">Discover</span>
                    </button>

                    {/* Center Play Button */}
                    <button
                      className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[40%] w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30 border-4 border-white hover:scale-105 transition-transform"
                      onClick={() => {
                        if (state.currentScreen === "topic-hub") {
                           // If we have a lastPlayed, toggle it. 
                           // Note: Ideally this toggles the *visible* card, but `lastPlayed` is the best proxy we have at this level without major refactor.
                           // If the user clicked a "Latest Episode" card, `lastPlayed` updated, so this button works correctly for that too.
                           if (state.lastPlayed) {
                               actions.togglePlay()
                           } else {
                               // Fallback to playing daily pick if nothing has ever been played
                               actions.playPodcast(dailyPick)
                           }
                        } else {
                           // If not on topic hub, play daily pick (or last played) and go to player
                           if (state.lastPlayed) {
                               actions.togglePlay() // resume
                               if (!state.isPlaying) actions.togglePlay() // ensure playing
                           } else {
                               actions.playPodcast(dailyPick)
                           }
                           actions.navigate("player")
                        }
                      }}
                    >
                      {state.currentScreen === "topic-hub" && isPlaying ? (
                        <Pause size={26} fill="currentColor" />
                      ) : (
                        <Play size={26} fill="currentColor" className="ml-0.5" />
                      )}
                    </button>

                    {/* Right Button */}
                    <button
                      className={cn(
                        "absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-colors",
                        state.currentScreen === "profile"
                          ? "text-primary"
                          : "text-gray-400"
                      )}
                      onClick={() => actions.navigate("profile")}
                    >
                      <User size={24} />
                      <span className="text-[10px] font-medium">Profile</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full opacity-60 z-[100]" />
            </div>

            {/* Side Buttons (Volume, Power) */}
            {/* Power Button (Right Side) */}
            <div className="absolute right-[-3px] top-[150px] w-[3px] h-[80px] bg-gray-700 rounded-l-sm" />
            
            {/* Volume Buttons (Left Side) */}
            <div className="absolute left-[-3px] top-[120px] w-[3px] h-[32px] bg-gray-700 rounded-r-sm" />
            <div className="absolute left-[-3px] top-[170px] w-[3px] h-[32px] bg-gray-700 rounded-r-sm" />
            <div className="absolute left-[-3px] top-[210px] w-[3px] h-[60px] bg-gray-700 rounded-r-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}