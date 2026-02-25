import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from 'lucide-react'
import { AppActions, AppState } from "../types"
import { LEVELS, Level } from "@/lib/podcast-data"
import { cn } from "@/lib/utils"

interface Props {
  state: AppState
  actions: AppActions
}

export function ScreenSelectLevel({ state, actions }: Props) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="p-6 pb-2 flex items-center gap-4">
        <button
          onClick={actions.goBack}
          className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Select Level</h1>
      </header>

      <div className="px-6 pb-4">
        <p className="text-gray-500">Please select your English proficiency level</p>
      </div>

      {/* Cards */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 space-y-4">
        {LEVELS.map((level, index) => {
          const isSelected = state.chosenLevel === level.id
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => actions.setLevel(level.id)}
              className={cn(
                "p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer relative overflow-hidden",
                isSelected
                  ? "border-primary bg-white shadow-md"
                  : "border-transparent bg-white shadow-sm hover:bg-gray-50"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {level.id}
                  </h3>
                  <p className="font-medium text-gray-700">{level.title}</p>
                </div>
                {isSelected && (
                  <div className="bg-primary text-white p-1 rounded-full">
                    <Check size={16} />
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-2 pt-2 border-t border-gray-100">
                <p>{level.subtitle}</p>
                <p className="mt-1">{level.description}</p>
              </div>
            </motion.div>
          )
        })}
      </main>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
        <Button
          size="lg"
          className="w-full h-14 text-lg rounded-full shadow-lg"
          disabled={!state.chosenLevel}
          onClick={() => actions.navigate("select-topic")}
        >
          Next: Select Topic
        </Button>
      </div>
    </div>
  )
}
