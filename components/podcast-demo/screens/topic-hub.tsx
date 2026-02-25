import { motion, AnimatePresence } from "framer-motion"
import { Play, Clock, ChevronDown, Check, X, List, Pause, SkipBack, SkipForward, RotateCcw, Gauge, Heart, Headphones, Mic, Sparkles, Music, Languages } from 'lucide-react'
import { AppActions, AppState } from "../types"
import { MOCK_PODCASTS, TOPICS, LEVELS, PodcastItem } from "@/lib/podcast-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"

const GRADIENTS = [
  "bg-gradient-to-br from-blue-400 to-purple-500",
  "bg-gradient-to-br from-indigo-400 to-cyan-400",
  "bg-gradient-to-br from-rose-400 to-orange-400", 
  "bg-gradient-to-br from-emerald-400 to-teal-500",
  "bg-gradient-to-br from-fuchsia-500 to-pink-500",
]

const ICONS = [Headphones, Mic, Sparkles, Music, Play]

interface Props {
  state: AppState
  actions: AppActions
}

export function ScreenTopicHub({ state, actions }: Props) {
  const [isTopicSelectorOpen, setIsTopicSelectorOpen] = useState(false)
  const [isLevelSelectorOpen, setIsLevelSelectorOpen] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [progress, setProgress] = useState(0)
  
  // New states for Text/Quiz view
  const [showTranscript, setShowTranscript] = useState(false)
  const [activeTab, setActiveTab] = useState<'transcript' | 'quiz'>('transcript')
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [visibleTranslations, setVisibleTranslations] = useState<Set<number>>(new Set())
  
  const toggleTranslation = (index: number) => {
    setVisibleTranslations(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }
  
  // Selected episode for "card view" (defaults to Daily Pick initially)
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastItem | null>(null)

  // Mock Transcript Data
  const TRANSCRIPT = [
    { 
      time: "00:00", 
      speaker: "Host", 
      text: "Welcome back to another episode of Daily English. Today we're discussing a fascinating topic.",
      translation: "欢迎回到《每日英语》的另一集。今天我们将讨论一个有趣的话题。" 
    },
    { 
      time: "00:15", 
      speaker: "Guest", 
      text: "Thanks for having me! I'm really excited to dive into this.",
      translation: "谢谢邀请我！我真的很兴奋能深入探讨这个话题。" 
    },
    { 
      time: "00:30", 
      speaker: "Host", 
      text: "So, let's start with the basics. Can you explain the core concept to our listeners?",
      translation: "那么，让我们从基础开始。你能给我们的听众解释一下核心概念吗？" 
    },
    { 
      time: "00:45", 
      speaker: "Guest", 
      text: "Absolutely. It essentially boils down to understanding how we process information in our daily lives.",
      translation: "当然。归根结底，这是关于理解我们在日常生活中如何处理信息的。" 
    },
    { 
      time: "01:00", 
      speaker: "Host", 
      text: "That's interesting. Does it apply to everyone?",
      translation: "这很有趣。这对每个人都适用吗？" 
    },
    { 
      time: "01:15", 
      speaker: "Guest", 
      text: "Yes, it's a universal principle, though it manifests differently for each person.",
      translation: "是的，这是一个普遍原则，尽管它在每个人身上的表现不同。" 
    },
    { 
      time: "01:30", 
      speaker: "Host", 
      text: "I see. Can you give us a concrete example?",
      translation: "我明白了。你能给我们一个具体的例子吗？" 
    },
    { 
      time: "01:45", 
      speaker: "Guest", 
      text: "Sure. Think about how you decide what to eat for breakfast...",
      translation: "当然。想想你是如何决定早餐吃什么的……" 
    },
    { 
      time: "02:00", 
      speaker: "Host", 
      text: "Ah, the classic breakfast dilemma!",
      translation: "啊，经典的早餐难题！" 
    },
  ]

  // Mock Quiz Data
  const QUIZ = [
    { 
      question: "What is the main topic of today's discussion?", 
      options: ["Daily routines", "Information processing", "Universal principles", "Concrete examples"], 
      answer: 1 
    },
    { 
      question: "Who is the guest?", 
      options: ["A scientist", "An author", "An expert", "Not specified"], 
      answer: 3 
    }
  ]

  // Filter podcasts based on selection (mock filter)
  const podcasts = MOCK_PODCASTS.filter(
    (p) =>
      (!state.chosenTopic || p.topic === state.chosenTopic) &&
      (!state.chosenLevel || p.level === state.chosenLevel)
  )

  // Fallback if no exact match in mock data
  const displayPodcasts = podcasts.length > 0 ? podcasts : MOCK_PODCASTS

  const dailyRec = displayPodcasts[0]
  const latestEpisodes = displayPodcasts.slice(1)

  // Set initial selected episode to daily pick if none selected
  useEffect(() => {
      if (!selectedEpisode && dailyRec) {
          setSelectedEpisode(dailyRec)
      }
  }, [dailyRec, selectedEpisode])
  
  // Update selected episode when filter changes (dailyRec changes)
  useEffect(() => {
      setSelectedEpisode(dailyRec)
  }, [dailyRec])

  // Determine which episode to show in the card
  const activeEpisode = selectedEpisode || dailyRec
  const isDailyPick = activeEpisode.id === dailyRec.id


  // Simulate playing the daily pick immediately when entering screen (if not already playing something else)
  // In a real app, we'd probably want more complex logic, but for this demo:
  useEffect(() => {
    if (!state.isPlaying && dailyRec) {
      // We don't auto-play audio to avoid browser policies, but we show it as 'ready'
      // or we could auto-play if user interaction led here.
      // For visual "playing" state:
      // actions.playPodcast(dailyRec) 
    }
  }, [])

  // Mock progress timer for the daily pick card
  useEffect(() => {
    let interval: any
    if (state.isPlaying && state.lastPlayed?.id === activeEpisode.id) {
      interval = setInterval(() => {
        setProgress((p) => {
            if (p >= 100) return 100
            // Simulate progress faster for demo purposes
            return p + 0.5 * playbackSpeed 
        })
      }, 100)
    } else if (!state.isPlaying) {
        // Only reset if manually paused, but for completion logic we handle it in the other effect
        // For simplicity in this demo, we'll keep the reset-on-pause behavior 
        // unless it's 100 (completed) which we handle separately
        // Update: To allow "pause and resume", we shouldn't reset progress to 0 on pause unless we switch tracks.
        // But for this simple demo effect, let's just keep it simple.
        // if (progress < 100) setProgress(0) 
    }
    return () => clearInterval(interval)
  }, [state.isPlaying, state.lastPlayed, activeEpisode.id, playbackSpeed])

  // Reset progress when track changes manually
  useEffect(() => {
      setProgress(0)
  }, [activeEpisode.id])

  // Handle Episode Completion (Auto-play next)
  useEffect(() => {
      if (progress >= 100) {
          const currentIndex = displayPodcasts.findIndex(p => p.id === activeEpisode.id)
          if (currentIndex !== -1 && currentIndex < displayPodcasts.length - 1) {
              const nextEpisode = displayPodcasts[currentIndex + 1]
              
              // Small delay for UX
              setTimeout(() => {
                  setSelectedEpisode(nextEpisode)
                  actions.playPodcast(nextEpisode)
                  setProgress(0)
              }, 500)
          } else {
              // End of playlist
              actions.togglePlay()
              setProgress(0)
          }
      }
  }, [progress, activeEpisode.id, displayPodcasts])


  const handlePlayActiveEpisode = () => {
      if (state.lastPlayed?.id === activeEpisode.id) {
          actions.togglePlay()
      } else {
          actions.playPodcast(activeEpisode)
      }
  }

  const isActiveEpisodePlaying = state.isPlaying && state.lastPlayed?.id === activeEpisode.id

  const toggleEpisodeType = () => {
    if (isDailyPick) {
        // If currently Daily Pick, switch to first Latest Episode
        if (latestEpisodes.length > 0) {
            setSelectedEpisode(latestEpisodes[0])
        }
    } else {
        // If currently Latest Episode, switch to Daily Pick
        setSelectedEpisode(dailyRec)
    }
  }

  const togglePlaybackSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2]
    const currentIndex = speeds.indexOf(playbackSpeed)
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length]
    setPlaybackSpeed(nextSpeed)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden relative">
      {/* Header without back button, centered selectors */}
      <header className="bg-transparent px-4 pt-1 pb-2 z-10 flex items-center justify-center flex-shrink-0 absolute top-0 left-0 right-0">
        {/* Center Selectors */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1 rounded-full shadow-sm border border-white/20">
          <button 
            onClick={() => setIsTopicSelectorOpen(true)}
            className="flex items-center gap-1 active:scale-95 transition-transform px-2 py-1"
          >
             <span className="text-xs font-semibold text-gray-900">
              {state.chosenTopic || "All Topics"}
            </span>
            <ChevronDown size={12} className="text-gray-500" />
          </button>
          <div className="w-[1px] h-3 bg-gray-300" />
          <button 
            onClick={() => setIsLevelSelectorOpen(true)}
            className="flex items-center gap-1 active:scale-95 transition-transform px-2 py-1"
          >
            <span className="text-xs font-semibold text-gray-900">
              {state.chosenLevel || "Level"}
            </span>
            <ChevronDown size={12} className="text-gray-500" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center items-center p-6 pb-24 relative perspective-1000">
        
        {/* Card Container with Flip Animation */}
        <motion.div 
            className="relative w-full aspect-[9/16] max-h-[740px]"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Front of Card (Player View) */}
            <div 
                className={cn(
                    "absolute inset-0 w-full h-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden backface-hidden",
                    isFlipped ? "pointer-events-none" : "pointer-events-auto"
                )}
                style={{ backfaceVisibility: 'hidden' }}
            >
                {/* Background Image or Gradient */}
                <div className="absolute inset-0 transition-all duration-500">
                    {isDailyPick ? (
                         <img
                            key={activeEpisode.id} 
                            src={activeEpisode.imageUrl}
                            alt={activeEpisode.title}
                            className={cn(
                                "w-full h-full object-cover transition-all duration-500",
                                showTranscript ? "blur-xl scale-110 brightness-50" : ""
                            )}
                            onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80"
                            }}
                        />
                    ) : (
                        <div className={cn(
                            "w-full h-full transition-all duration-500 relative overflow-hidden",
                             GRADIENTS[(displayPodcasts.findIndex(p => p.id === activeEpisode.id) - 1) % GRADIENTS.length] || GRADIENTS[0],
                             showTranscript ? "blur-xl scale-110 brightness-50" : ""
                        )}>
                             {/* Shimmer/Wave Effect */}
                            <motion.div
                                key={activeEpisode.id}
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                initial={{ x: '-100%' }}
                                animate={{
                                    x: '100%',
                                }}
                                transition={{
                                    repeat: 0,
                                    duration: 2,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    )}

                     <div className={cn(
                         "absolute inset-0 transition-colors duration-500",
                         showTranscript 
                            ? "bg-black/60" 
                            : isDailyPick 
                                ? "bg-gradient-to-b from-black/10 via-transparent via-40% to-black/95 to-90%"
                                : "bg-gradient-to-b from-transparent via-transparent via-40% to-black/80 to-90%"
                     )} />
                </div>

                {/* Top Right Actions */}
                {!showTranscript && (
                    <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
                         <button 
                            onClick={(e) => {
                                e.stopPropagation()
                                actions.addToFavorites(activeEpisode.id)
                            }}
                            className="p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
                        >
                            <Heart size={20} className={cn(state.favorites.includes(activeEpisode.id) ? "fill-red-500 text-red-500" : "text-white")} />
                        </button>
                        <button 
                            onClick={() => setIsFlipped(true)}
                            className="p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
                        >
                            <List size={20} />
                        </button>
                    </div>
                )}
                 
                 {/* Episode Label (Daily Pick OR Latest Episode) */}
                 {!showTranscript && (
                    <div className="absolute top-6 left-6 pointer-events-auto z-20">
                        <Badge 
                            onClick={toggleEpisodeType}
                            className="bg-white/90 hover:bg-white text-black border-none backdrop-blur-sm font-bold text-xs uppercase tracking-wider px-3 py-1 shadow-lg cursor-pointer select-none transition-transform active:scale-95"
                        >
                            {isDailyPick ? "Daily Pick" : "Latest Episode"}
                        </Badge>
                    </div>
                 )}

                {/* Main Content Area (Transcript/Quiz OR Title/Desc) */}
                <div className="absolute inset-0 pt-10 pb-32 px-6 overflow-hidden pointer-events-none">
                    <AnimatePresence mode="wait">
                        {showTranscript ? (
                            <motion.div
                                key="transcript-view"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full h-full flex flex-col pointer-events-auto"
                            >
                                {/* Tabs */}
                                <div className="flex justify-center gap-6 mb-4">
                                    <button 
                                        onClick={() => setActiveTab('transcript')}
                                        className={cn(
                                            "text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors",
                                            activeTab === 'transcript' ? "text-white border-white" : "text-white/40 border-transparent hover:text-white/70"
                                        )}
                                    >
                                        Transcript
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('quiz')}
                                        className={cn(
                                            "text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors",
                                            activeTab === 'quiz' ? "text-white border-white" : "text-white/40 border-transparent hover:text-white/70"
                                        )}
                                    >
                                        Quiz
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto scrollbar-none mask-image-gradient">
                                    {activeTab === 'transcript' ? (
                                        <div className="space-y-8 pb-20 px-1">
                                            {TRANSCRIPT.map((line, i) => {
                                                const isHost = line.speaker === "Host"
                                                const isTranslated = visibleTranslations.has(i)
                                                return (
                                                <div key={i} className="flex flex-col gap-2 group relative">
                                                    <div className="flex items-baseline gap-3 opacity-70 group-hover:opacity-100 transition-opacity justify-between">
                                                        <div className="flex items-baseline gap-3">
                                                            <span className={cn(
                                                                "text-xs font-bold uppercase tracking-wider",
                                                                isHost ? "text-blue-300" : "text-purple-300"
                                                            )}>
                                                                {line.speaker}
                                                            </span>
                                                            <span className="text-[10px] font-mono text-white/40">
                                                                {line.time}
                                                            </span>
                                                        </div>
                                                        <button 
                                                            onClick={() => toggleTranslation(i)}
                                                            className={cn(
                                                                "p-1.5 rounded-full transition-all hover:bg-white/10",
                                                                isTranslated ? "text-blue-300 opacity-100 bg-white/10" : "text-white/40 opacity-0 group-hover:opacity-100"
                                                            )}
                                                            title="Translate"
                                                        >
                                                            <Languages size={14} />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <p className="text-white/90 text-base leading-relaxed tracking-wide font-medium">
                                                            {line.text}
                                                        </p>
                                                        
                                                        <AnimatePresence>
                                                            {isTranslated && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: "auto" }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <p className="text-white/60 text-sm leading-relaxed tracking-wide pb-2">
                                                                        {line.translation}
                                                                    </p>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            )})}
                                        </div>
                                    ) : (
                                        <div className="space-y-10 pb-20 px-1">
                                            {QUIZ.map((q, i) => (
                                                <div key={i} className="flex flex-col gap-3 group">
                                                    <div className="flex items-baseline gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                                                            Question {i+1}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-white/90 text-base leading-relaxed tracking-wide font-medium mb-2">
                                                        {q.question}
                                                    </p>

                                                    <div className="space-y-2.5">
                                                        {q.options.map((opt, optIndex) => (
                                                            <button 
                                                                key={optIndex}
                                                                className={cn(
                                                                    "w-full text-left p-4 rounded-xl text-sm transition-all border",
                                                                    q.answer === optIndex 
                                                                        ? "bg-white text-black border-white font-bold shadow-lg scale-[1.01]" 
                                                                        : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:border-white/30"
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={cn(
                                                                        "w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                                                                        q.answer === optIndex ? "border-black text-black" : "border-white/30 text-white/50"
                                                                    )}>
                                                                        {String.fromCharCode(65 + optIndex)}
                                                                    </div>
                                                                    <span className="leading-snug">{opt}</span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                             /* Title and Description (Only shown when NOT in transcript mode) */
                            <div className="hidden" /> 
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Content (Title/Controls) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-10 text-white flex flex-col gap-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pointer-events-auto">
                    
                    {!showTranscript && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-2"
                            key={activeEpisode.id} // Add key to trigger animation on change
                        >
                            <h2 className="text-3xl font-bold leading-tight tracking-tight">
                                {activeEpisode.title}
                            </h2>
                            <p className="text-white/80 text-sm font-medium leading-relaxed line-clamp-2">
                                {activeEpisode.description}
                            </p>
                        </motion.div>
                    )}

                    {/* Progress Bar */}
                    <div className="w-full space-y-1 translate-y-6">
                         <Slider
                            value={[progress]}
                            max={100}
                            step={1}
                            className="cursor-pointer [&>[data-slot=slider-track]]:h-[2px] [&>[data-slot=slider-thumb]]:h-2.5 [&>[data-slot=slider-thumb]]:w-2.5 [&>[data-slot=slider-thumb]]:border-2"
                            // onValueChange for seeking
                          />
                          <div className="flex justify-between text-[9px] text-white/50 font-medium tracking-wide px-0.5">
                              <span>{Math.floor((progress / 100) * 300 / 60)}:{(Math.floor((progress / 100) * 300) % 60).toString().padStart(2, '0')}</span>
                              <span>{activeEpisode.duration}</span>
                          </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-4 px-2">
                        {/* Speed Button */}
                         <button 
                            onClick={togglePlaybackSpeed}
                            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full w-10 flex justify-center"
                        >
                            <span className="text-xs font-bold">{playbackSpeed}x</span>
                        </button>

                         <button className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                            <RotateCcw size={24} />
                        </button>
                         <button className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                            <SkipBack size={32} fill="currentColor" className="opacity-50" />
                        </button>
                        
                        {/* Removed Center Play Button - Controlled by Bottom Nav */}

                        <button className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                            <SkipForward size={32} fill="currentColor" className="opacity-50" />
                        </button>
                        
                        {/* Text/Close Button */}
                         <button 
                            className={cn(
                                "transition-all duration-300 p-2 rounded-full",
                                showTranscript ? "bg-white text-black hover:bg-white/90" : "text-white/70 hover:text-white hover:bg-white/10"
                            )}
                             onClick={() => setShowTranscript(!showTranscript)}
                        >
                            {showTranscript ? (
                                <X size={20} />
                            ) : (
                                <span className="text-[10px] font-bold border border-white/30 rounded px-1.5 py-0.5">Text</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Back of Card (Latest Episodes List) */}
            <div 
                className={cn(
                    "absolute inset-0 w-full h-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden",
                    !isFlipped ? "pointer-events-none" : "pointer-events-auto"
                )}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                <div className="flex flex-col h-full">
                    {/* Header for Back Side */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 relative z-50 pointer-events-auto">
                         <h3 className="text-xl font-bold text-gray-900">Latest Episodes</h3>
                         <button 
                            onClick={(e) => {
                                e.stopPropagation()
                                e.nativeEvent.stopImmediatePropagation()
                                setIsFlipped(false)
                            }}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors cursor-pointer relative z-50 pointer-events-auto"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-3 pb-20">
                             {latestEpisodes.map((podcast, index) => {
                                const isPlayingThis = state.isPlaying && state.lastPlayed?.id === podcast.id
                                const isSelected = activeEpisode.id === podcast.id

                                return (
                                <motion.div
                                    key={podcast.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all border",
                                        isSelected ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-gray-50 border-transparent hover:bg-gray-100"
                                    )}
                                    onClick={() => {
                                        setSelectedEpisode(podcast)
                                        setIsFlipped(false) // Flip back to front to show this episode
                                    }}
                                >
                                    <div className="flex gap-4 p-3">
                                        <div className={cn(
                                            "relative w-[70px] h-[70px] rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center",
                                            GRADIENTS[index % GRADIENTS.length]
                                        )}>
                                            
                                            {isPlayingThis && (
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                                                    <Pause size={24} className="fill-white text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h3 className={cn("font-bold text-sm mb-1 line-clamp-1", isSelected ? "text-primary" : "text-gray-900")}>
                                            {podcast.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                                            {podcast.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                            <span className="flex items-center gap-1 font-medium">
                                            <Clock size={10} />
                                            {podcast.duration}
                                            </span>
                                            <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                                            <span className="font-medium text-gray-500">
                                                {podcast.level}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                </motion.div>
                             )})}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Topic Selector Pop-up */}
      <AnimatePresence>
        {isTopicSelectorOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => setIsTopicSelectorOpen(false)}
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
                  <h2 className="text-xl font-bold text-gray-900">Select Topic</h2>
                  <button 
                    onClick={() => setIsTopicSelectorOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[50vh]">
                  {TOPICS.map((topic) => {
                    const isSelected = state.chosenTopic === topic.id
                    return (
                      <button
                        key={topic.id}
                        onClick={() => {
                          actions.setTopic(topic.id)
                          setIsTopicSelectorOpen(false)
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mb-1",
                          isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                        )}>
                           {/* We would dynamically render icon here, but for simplicity using first letter if needed or just text */}
                           <span className="font-bold">{topic.label[0]}</span>
                        </div>
                        <span className={cn("font-semibold text-sm", isSelected ? "text-primary" : "text-gray-900")}>
                          {topic.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Level Selector Pop-up */}
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