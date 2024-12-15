import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Classhive from "../assets/ClasshiveLP.png"

export function About() {
  return (
    <section className="w-full px-4 py-16 md:py-24 bg-white">
      <Card className="w-full max-w-[95%] mx-auto overflow-hidden">
        <div className="bg-gradient-to-b from-[#0A1628] to-[#1A2735]/80 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px]">
              {/* Floating icons */}
              <div className="absolute inset-0">
                {/* Top icon */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[50%] top-[15%] -translate-x-1/2"
                >
                  <div className="bg-[#1A2735] p-5 rounded-full w-24 h-24 flex items-center justify-center border border-white/10">
                    <svg viewBox="0 0 24 24" className="w-14 h-14 text-sky-200" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </motion.div>

                {/* Left icon */}
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute left-[30%] top-[35%] -translate-y-1/2"
                >
                  <div className="bg-[#1A2735] p-5 rounded-full w-24 h-24 flex items-center justify-center border border-white/10">
                    <svg viewBox="0 0 24 24" className="w-14 h-14 text-sky-200" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                    </svg>
                  </div>
                </motion.div>

                {/* Bottom icon */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute left-[50%] bottom-[15%] -translate-x-1/2"
                >
                  <div className="bg-[#1A2735] p-5 rounded-full w-24 h-24 flex items-center justify-center border border-white/10">
                    <svg viewBox="0 0 24 24" className="w-14 h-14 text-sky-200" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </motion.div>

                {/* Right icon */}
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute left-[70%] top-[30%] -translate-y-1/2"
                >
                  <div className="bg-[#1A2735] p-5 rounded-full w-24 h-24 flex items-center justify-center border border-white/10">
                    <svg viewBox="0 0 24 24" className="w-14 h-14 text-sky-200" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div>
              <img src={Classhive} className="pb-4"/>
              <p className="text-gray-300 text-lg leading-relaxed">
                is an interactive platform designed to enhance learning experiences for both teachers and students.
                It combines the functionality of a quiz website with a virtual classroom environment, allowing educators
                to create and manage quizzes, track student progress, and facilitate classroom discussions all in one place.
                With ClassHive, learning becomes more engaging, collaborative, and fun!
              </p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
