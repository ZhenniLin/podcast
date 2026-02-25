import { AppActions, AppState } from "../types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Flame, Clock, Settings, History, Heart, ChevronLeft, ChevronRight, Play, Globe, Bell, X, Check } from 'lucide-react'
import { MOCK_PODCASTS, LEVELS, Level } from "@/lib/podcast-data"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  state: AppState
  actions: AppActions
}

export function ScreenProfile({ state, actions }: Props) {
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLevelSelectorOpen, setIsLevelSelectorOpen] = useState(false)
  
  const historyItems = state.history
    .slice(0, 10)
    .map(id => MOCK_PODCASTS.find(p => p.id === id))
    .filter(Boolean)

  const favoriteItems = state.favorites
    .map(id => MOCK_PODCASTS.find(p => p.id === id))
    .filter(Boolean)

  const nextLevelXP = 2000
  const xpProgress = (state.xp / nextLevelXP) * 100

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <header className="bg-white p-6 pb-4 shadow-sm z-10 flex-shrink-0 relative">
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={() => actions.goBack()}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Profile</h1>
          <button 
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="pb-24">
          {/* Profile Info Section - Integrated into scroll view */}
          <div className="bg-white rounded-b-[2rem] px-6 pb-8 mb-6 shadow-sm pt-2">
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
                <AvatarImage src="/placeholder.svg?height=100&width=100" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Alex Chen</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant="secondary" 
                    className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer active:scale-95 transition-transform" 
                    onClick={() => setIsLevelSelectorOpen(true)}
                  >
                    Level {state.chosenLevel || "A1"}
                  </Badge>
                  <span 
                    className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={() => setIsLevelSelectorOpen(true)}
                  >
                    Tap to change
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-orange-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border border-orange-100">
                <div className="flex items-center gap-2 mb-1">
                    <Flame size={24} className="text-orange-500 fill-orange-500" />
                    <span className="text-2xl font-bold text-gray-900">{state.streak}</span>
                </div>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Day Streak</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                    <Clock size={24} className="text-blue-500" />
                    <span className="text-2xl font-bold text-gray-900">45</span>
                </div>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Mins/Week</span>
              </div>
            </div>

            {/* Tabs for Favorites and History */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('favorites')}
                className={cn(
                  "flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all",
                  activeTab === 'favorites'
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart size={16} className={activeTab === 'favorites' ? 'fill-white' : ''} />
                  <span>Favorites ({favoriteItems.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={cn(
                  "flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all",
                  activeTab === 'history'
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <History size={16} />
                  <span>History ({historyItems.length})</span>
                </div>
              </button>
            </div>

            {/* Content Area for Favorites/History */}
            <div className="mb-6">
              {activeTab === 'favorites' && (
                <div className="space-y-2 overflow-y-auto">
                  {favoriteItems.length === 0 ? (
                    <div className="bg-gray-50 p-12 rounded-2xl text-center text-gray-400 text-sm flex flex-col items-center justify-center min-h-[200px]">
                      <Heart size={48} className="text-gray-200 mb-4" />
                      <p>No favorites yet</p>
                      <p className="text-xs mt-2">Mark episodes as favorite to see them here</p>
                    </div>
                  ) : (
                    favoriteItems.map((item) => (
                      <div
                        key={item.id}
                        className="w-full bg-gray-50 p-3 rounded-xl flex items-center gap-3"
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
                          <p className="text-xs text-gray-500 truncate">{item.duration}</p>
                        </div>
                        <button
                          onClick={() => {
                            actions.playPodcast(item)
                            actions.navigate("player")
                          }}
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 active:scale-95 transition-transform flex-shrink-0"
                        >
                          <Play size={14} className="text-primary fill-primary" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-2 overflow-y-auto">
                  {historyItems.length === 0 ? (
                    <div className="bg-gray-50 p-12 rounded-2xl text-center text-gray-400 text-sm flex flex-col items-center justify-center min-h-[200px]">
                      <History size={48} className="text-gray-200 mb-4" />
                      <p>No listening history yet</p>
                      <p className="text-xs mt-2">Start listening to track your progress</p>
                    </div>
                  ) : (
                    historyItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          actions.playPodcast(item)
                          actions.navigate("player")
                        }}
                        className="w-full bg-gray-50 p-3 rounded-xl flex items-center gap-3 hover:bg-gray-100 active:scale-[0.99] transition-all"
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
                          <p className="text-xs text-gray-500 truncate">{item.duration}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Settings Pop-up Overlay */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => setIsSettingsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-50 overflow-hidden"
              style={{ maxHeight: '80vh' }}
            >
              <div className="p-6 pb-8">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <div className="space-y-2">
                  <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Globe size={16} className="text-blue-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">English</span>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </button>

                  <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                        <Bell size={16} className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">On</span>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-center text-xs text-gray-400">Version 2.0.1 (Build 1024)</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Level Selector Pop-up Overlay */}
      <AnimatePresence>
        {isLevelSelectorOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => setIsLevelSelectorOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-50 overflow-hidden"
              style={{ maxHeight: '80vh' }}
            >
              <div className="p-6 pb-8">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Select Level</h2>
                  <button 
                    onClick={() => setIsLevelSelectorOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3">
                  {LEVELS.map((level) => {
                    const isSelected = state.chosenLevel === level.id
                    return (
                      <button
                        key={level.id}
                        onClick={() => {
                          actions.setLevel(level.id)
                          setIsLevelSelectorOpen(false)
                        }}
                        className={cn(
                          "w-full p-4 rounded-xl flex items-center justify-between border-2 transition-all",
                          isSelected 
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200"
                        )}
                      >
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className={cn("text-lg font-bold", isSelected ? "text-primary" : "text-gray-900")}>
                              {level.id}
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                              {level.title}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {level.subtitle}
                          </div>
                        </div>
                        
                        {isSelected && (
                          <div className="bg-primary text-white p-1 rounded-full">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
