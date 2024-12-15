import { type FC } from 'react'
import ManIcon from '../assets/random guy 1.png'
import Classhive from '../assets/ClasshiveLP.png'
import Mask from '../assets/mask.png'

export const Hero: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background Mask */}
      <div className="absolute top-0 right-0 h-full max-h-[1000px]">
        <img
          src={Mask}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628]">
              <img 
                src={Classhive} 
                alt="ClassHive" 
                className="max-w-[300px] w-full"
              />
            </h1>
            <p className="text-[#1A2735] text-lg md:text-xl max-w-[500px]">
              A dynamic platform where teachers create quizzes, manage classrooms, and track student progress, making learning interactive and engaging.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative z-10 overflow-visible">
            <div className="relative">
              <img
                src={ManIcon}
                alt="Educational illustration"
                className="h-[700px] max-w-[1700px] "
              />
              {/* Floating Elements */}
              <div className="absolute top-1/4 right-[-250px] animate-float-slow">
                <div className="bg-[#FF6B2C] rounded-full p-4">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-1/3 left-1/3 animate-float">
                <div className="bg-[#FFD700] rounded-full p-2">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

