import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Heart, MoreHorizontal, Play, Pause, SkipBack, SkipForward, X, CheckCircle2, Repeat, Shuffle, ListMusic, Share, Link as LinkIcon, Instagram, MessageCircle, Upload } from 'lucide-react'
import { AppActions, AppState } from "../types"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
  state: AppState
  actions: AppActions
}

export function ScreenPlayer({ state, actions }: Props) {
  const podcast = state.lastPlayed
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<"transcript" | "quiz">("transcript")
  const [playbackRate, setPlaybackRate] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  // Mock progress timer
  useEffect(() => {
    let interval: any
    if (state.isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [state.isPlaying])

  if (!podcast) return null

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between flex-shrink-0 bg-white z-10">
        <button
          onClick={actions.goBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Now Playing
        </span>
        <button 
          className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsShareOpen(true)}
        >
          <Share size={24} className="text-gray-900" />
        </button>
      </header>

      <div 
        className="flex-1 overflow-y-auto relative"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent',
        }}
      >
        <div className="px-6 pb-8">
          {/* Artwork */}
          <div className="w-full aspect-square rounded-3xl bg-gray-100 overflow-hidden shadow-xl mb-6 mx-auto max-w-sm">
            <img
              src={podcast.imageUrl}
              alt={podcast.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80"
              }}
            />
          </div>

          {/* Info */}
          <div className="mb-6 text-center px-4">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight text-left flex-1">
                {podcast.title}
              </h2>
              <button 
                className={cn(
                  "p-2 transition-colors rounded-full flex-shrink-0",
                  state.favorites.includes(podcast.id) 
                    ? "text-red-500" 
                    : "text-gray-400 hover:bg-gray-100"
                )}
                onClick={() => actions.addToFavorites(podcast.id)}
              >
                <Heart size={24} className={state.favorites.includes(podcast.id) ? "fill-red-500" : ""} />
              </button>
            </div>
            <p className="text-gray-500 text-base mb-3 text-left">{podcast.description}</p>
          </div>

          {/* Controls */}
          <div className="mb-8">
            <Slider
              value={[progress]}
              max={100}
              step={1}
              className="mb-3"
              onValueChange={(v) => setProgress(v[0])}
            />
            <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
              <span>1:15</span>
              <span>{podcast.duration}</span>
            </div>

            <div className="flex items-center justify-center gap-8 mb-2">
              <button
                className="text-gray-900 font-bold text-sm px-3 py-1 rounded-lg hover:bg-gray-100"
                onClick={() => setPlaybackRate(playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1)}
              >
                {playbackRate}x
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors">
                <SkipBack size={32} />
              </button>
              <button
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                onClick={actions.togglePlay}
              >
                {state.isPlaying ? (
                  <Pause size={28} fill="currentColor" />
                ) : (
                  <Play size={28} fill="currentColor" className="ml-1" />
                )}
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors">
                <SkipForward size={32} />
              </button>
              <button 
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={actions.togglePlaybackMode}
              >
                {state.playbackMode === "repeat" && <Repeat size={24} className="text-primary" />}
                {state.playbackMode === "shuffle" && <Shuffle size={24} className="text-primary" />}
                {state.playbackMode === "list" && <ListMusic size={24} />}
              </button>
            </div>
          </div>

          {/* Transcript / Quiz Tabs */}
          <div className="bg-gray-50 rounded-3xl -mx-6 px-6 py-6">
            <div className="flex gap-8 mb-6 justify-center">
              <button
                className={cn(
                  "text-base font-bold pb-2 relative transition-colors",
                  activeTab === "transcript" ? "text-gray-900" : "text-gray-400"
                )}
                onClick={() => {
                  setActiveTab("transcript")
                  setSelectedAnswer(null)
                  setShowExplanation(false)
                }}
              >
                Transcript
                {activeTab === "transcript" && (
                  <motion.div
                    layoutId="tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full"
                  />
                )}
              </button>
              <button
                className={cn(
                  "text-base font-bold pb-2 relative transition-colors",
                  activeTab === "quiz" ? "text-gray-900" : "text-gray-400"
                )}
                onClick={() => {
                  setActiveTab("quiz")
                  setSelectedAnswer(null)
                  setShowExplanation(false)
                }}
              >
                Quiz
                {activeTab === "quiz" && (
                  <motion.div
                    layoutId="tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full"
                  />
                )}
              </button>
            </div>

            <div className="space-y-4">
              {activeTab === "transcript" ? (
                <div className="space-y-6">
                  {podcast.transcript.map((line, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-sm text-gray-400 font-medium min-w-[50px]">
                        {Math.floor(line.time / 60)}:{(line.time % 60).toString().padStart(2, '0')}
                      </span>
                      <p className="text-base text-gray-700 leading-relaxed flex-1">
                        {line.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {podcast.quiz.map((q, qIndex) => (
                    <div key={qIndex} className="bg-white rounded-2xl p-5">
                      <h3 className="font-semibold text-gray-900 text-base mb-4">
                        {q.question}
                      </h3>
                      <div className="space-y-2">
                        {q.options.map((opt, idx) => (
                          <button
                            key={idx}
                            disabled={selectedAnswer !== null}
                            className={cn(
                              "w-full p-4 rounded-xl text-left transition-all border-2",
                              selectedAnswer === null && "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                              selectedAnswer === idx && idx === q.correctIndex && "border-green-500 bg-green-50",
                              selectedAnswer === idx && idx !== q.correctIndex && "border-red-500 bg-red-50",
                              selectedAnswer !== null && idx === q.correctIndex && selectedAnswer !== idx && "border-green-500 bg-green-50"
                            )}
                            onClick={() => {
                              setSelectedAnswer(idx)
                              setShowExplanation(true)
                              if (idx === q.correctIndex) {
                                actions.completePodcast(50)
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-gray-900">{opt}</span>
                              {selectedAnswer !== null && idx === q.correctIndex && (
                                <CheckCircle2 size={20} className="text-green-600" />
                              )}
                              {selectedAnswer === idx && idx !== q.correctIndex && (
                                <X size={20} className="text-red-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {showExplanation && selectedAnswer !== null && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 p-4 bg-blue-50 rounded-xl"
                        >
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Explanation: </span>
                            {q.explanation}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Sheet Overlay */}
      <AnimatePresence>
        {isShareOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => setIsShareOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-50 p-6 pb-8"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Share this episode</h3>
                
                {/* Podcast Preview Card */}
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 mb-6 text-left">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                    <img
                      src={podcast.imageUrl}
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{podcast.title}</h4>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{podcast.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <button className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <LinkIcon size={24} className="text-gray-900" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Copy Link</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                      <Instagram size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Instagram</span>
                  </button>

                  <button className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                      <MessageCircle size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Messages</span>
                  </button>

                  <button className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <MoreHorizontal size={24} className="text-gray-900" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">More</span>
                  </button>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full rounded-xl h-12 font-semibold"
                onClick={() => setIsShareOpen(false)}
              >
                Cancel
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

