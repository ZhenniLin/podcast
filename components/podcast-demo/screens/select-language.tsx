import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { AppActions, AppState, Language } from "../types"

interface Props {
  state: AppState
  actions: AppActions
}

const LANGUAGES: { id: Language; label: string; icon: string }[] = [
  { id: "English", label: "English", icon: "🇺🇸" },
  { id: "Spanish", label: "Spanish", icon: "🇪🇸" },
]

export function ScreenSelectLanguage({ state, actions }: Props) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="p-6 pb-2 flex items-center gap-4">
        <button
          onClick={actions.goBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Select Language</h1>
      </header>

      <div className="px-6 pb-8">
        <p className="text-gray-500">Choose the language you want to learn</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 space-y-4">
        {LANGUAGES.map((lang, index) => {
          const isSelected = state.chosenLanguage === lang.id
          return (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => actions.setLanguage(lang.id)}
              className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                isSelected
                  ? "border-black bg-gray-50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="text-4xl">{lang.icon}</span>
              <div className="flex-1 text-left">
                <span className="text-lg font-semibold text-gray-900 block">
                  {lang.label}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isSelected ? "border-black bg-black" : "border-gray-200"
              }`}>
                {isSelected && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>
            </motion.button>
          )
        })}
      </main>

      {/* Footer */}
      <div className="p-6 bg-white">
        <Button
          size="lg"
          className="w-full h-14 text-base font-semibold rounded-xl bg-black text-white hover:bg-gray-900 shadow-lg shadow-gray-200 transition-all duration-300"
          disabled={!state.chosenLanguage}
          onClick={() => actions.navigate("select-level")}
        >
          Next: Select Level
        </Button>
      </div>
    </div>
  )
}




