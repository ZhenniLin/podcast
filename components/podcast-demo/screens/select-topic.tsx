import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plane, Utensils, Briefcase, Coffee, Globe, Cpu, BookOpen, Heart } from 'lucide-react'
import { AppActions, AppState } from "../types"
import { TOPICS, Topic } from "@/lib/podcast-data"
import { cn } from "@/lib/utils"

interface Props {
  state: AppState
  actions: AppActions
}

const iconMap: Record<string, any> = {
  Plane,
  Utensils,
  Briefcase,
  Coffee,
  Globe,
  Cpu,
  BookOpen,
  Heart,
}

export function ScreenSelectTopic({ state, actions }: Props) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="p-6 pb-2 flex items-center gap-4">
        <button
          onClick={actions.goBack}
          className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Select Topic</h1>
      </header>

      <div className="px-6 pb-4">
        <p className="text-gray-500">Please select a topic you'd like to listen to</p>
      </div>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {TOPICS.map((topic, index) => {
            const isSelected = state.chosenTopic === topic.id
            const Icon = iconMap[topic.icon] || Globe

            return (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => actions.setTopic(topic.id)}
                className={cn(
                  "aspect-square rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200",
                  isSelected
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
                )}
              >
                <Icon size={32} strokeWidth={1.5} />
                <div className="text-center">
                  <div className="font-semibold text-sm">{topic.id}</div>
                  <div
                    className={cn(
                      "text-xs mt-1",
                      isSelected ? "text-primary-foreground/80" : "text-gray-400"
                    )}
                  >
                    {topic.label}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
        <Button
          size="lg"
          className="w-full h-14 text-lg rounded-full shadow-lg"
          disabled={!state.chosenTopic}
          onClick={() => actions.navigate("topic-hub")}
        >
          Go to Topic Hub
        </Button>
      </div>
    </div>
  )
}
