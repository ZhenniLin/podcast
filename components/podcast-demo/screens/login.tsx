import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { AppActions } from "../types"
import { useState } from "react"

interface Props {
  actions: AppActions
}

export function ScreenLogin({ actions }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true)
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    actions.login()
    setIsLoading(false)
    // After login, go to language selection
    actions.navigate("select-language")
  }

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex-1 flex flex-col justify-center items-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500">Sign in or Log in to continue your progress</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full space-y-4"
        >
          <Button
            variant="outline"
            className="w-full h-14 text-base font-semibold rounded-xl border-2 hover:bg-gray-50 relative"
            onClick={() => handleLogin('google')}
            disabled={isLoading}
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5 absolute left-4"
            />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 text-base font-semibold rounded-xl border-2 hover:bg-gray-50 relative"
            onClick={() => handleLogin('apple')}
            disabled={isLoading}
          >
             <svg className="w-5 h-5 absolute left-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.64 4.12-.65.85.39 2.19 1.4 2.48 1.85-.17.09-2.3 1.35-2.3 4.17s2.15 4.07 2.55 4.25c-.53 1.44-1.44 3.25-1.93 2.61zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continue with Apple
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-center text-xs text-gray-400">
          By continuing you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  )
}

