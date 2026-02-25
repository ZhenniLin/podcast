import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Headphones } from 'lucide-react'
import { AppActions } from "../types"

interface Props {
  actions: AppActions
}

export function ScreenHome({ actions }: Props) {
  return (
    <div className="flex flex-col h-full relative bg-white overflow-hidden font-sans">
      {/* Ambient Background Glow - Adjusted for light mode */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col h-full p-8 relative z-10">
        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-8"
        >
          <span className="text-3xl font-bold text-gray-900 tracking-tight">Laddeo</span>
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-2">
          {/* Main Icon with AI Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mb-12 relative"
          >
            {/* Pulse Glow Animation */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-indigo-100 rounded-3xl blur-xl"
            />
            
            {/* Icon Container */}
            <div className="relative w-24 h-24 bg-black rounded-3xl flex items-center justify-center z-10 shadow-xl shadow-indigo-100/50">
              <Headphones size={40} className="text-white" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-4xl font-bold leading-tight text-gray-900 tracking-tight">
              Language tailored
              <br />
              to your ears.
            </h1>
            <div className="space-y-1">
              <p className="text-lg text-gray-500 font-normal">
                Stop translating.
              </p>
              <p className="text-lg text-gray-500 font-normal">
                Start understanding.
              </p>
            </div>
          </motion.div>
        </main>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pb-8"
        >
          <Button
            size="lg"
            className="w-full h-14 text-base font-semibold rounded-xl bg-black text-white hover:bg-gray-900 shadow-lg shadow-gray-200 transition-all duration-300"
            onClick={() => actions.navigate("login")}
          >
            Start My Journey
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
