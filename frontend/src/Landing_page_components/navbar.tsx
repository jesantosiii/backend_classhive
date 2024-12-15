import { useState, useEffect } from 'react';
import logo from '../assets/Logo/Logo.png';
import Classhive from '../assets/ClasshiveLP.png';
import { useNavigate } from "react-router-dom"; 

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('HOME');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = ['home', 'about', 'services'];
    
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          
          if (scrollPosition >= offsetTop) {
            setActiveItem(section.toUpperCase());
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active item
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        setActiveItem(sectionId.toUpperCase());
      }, 100);
    }
    setIsOpen(false);
  };

  const handleLogInClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex flex-row items-center space-x-2">
            <img className="h-[45px] w-auto" src={logo} alt="ClassHive Logo" />
            <img className="h-6 w-auto" src={Classhive} alt="ClassHive Text" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a
                href="#home"
                className={`relative px-3 py-2 text-lg font-medium transition-colors ${
                  activeItem === 'HOME'
                    ? 'text-sky-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-700 after:transition-all after:duration-300 after:ease-in-out after:transform after:scale-x-100'
                    : 'text-sky-200 hover:text-sky-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-700 after:transition-all after:duration-300 after:ease-in-out after:transform after:scale-x-0 hover:after:scale-x-100'
                }`}
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              >
                HOME
              </a>
              <a
                href="#about"
                className={`relative px-3 py-2 text-lg font-medium transition-colors ${
                  activeItem === 'ABOUT'
                    ? 'text-sky-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-700 after:transition-all after:duration-300 after:ease-in-out after:transform after:scale-x-100'
                    : 'text-sky-200 hover:text-sky-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-700 after:transition-all after:duration-300 after:ease-in-out after:transform after:scale-x-0 hover:after:scale-x-100'
                }`}
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                ABOUT
              </a>
              <a
                href="#services"
                className={`relative px-3 py-2 text-lg font-medium transition-colors ${
                  activeItem === 'SERVICES'
                    ? 'text-sky-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-700 after:transition-all after:duration-300 after:ease-in-out after:transform after:scale-x-100'
                    : 'text-sky-200 hover:text-sky-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-700 after:transition-all after:duration-300 after:ease-in-out after:transform after:scale-x-0 hover:after:scale-x-100'
                }`}
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              >
                SERVICES
              </a>
              <div className="h-6 w-[1px] bg-sky-300"></div>
              <button  onClick={handleLogInClick} className="text-sky-200 hover:text-sky-700 px-3 py-2 text-lg font-medium transition-colors">
                LOGIN
              </button>
              <button onClick={handleSignUpClick} className="bg-[#8AABBD] text-white px-6 py-2 rounded-xl text-lg font-medium hover:bg-[#7795a7] transition-colors">
                SIGN UP
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A1628] bg-opacity-95">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              className={`text-white hover:text-gray-300 block px-3 py-2 text-lg font-medium ${
                activeItem === 'HOME' ? 'bg-[#1A2735]' : ''
              }`}
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              HOME
            </a>
            <a
              href="#about"
              className={`text-white hover:text-gray-300 block px-3 py-2 text-lg font-medium ${
                activeItem === 'ABOUT' ? 'bg-[#1A2735]' : ''
              }`}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              ABOUT
            </a>
            <a
              href="#services"
              className={`text-white hover:text-gray-300 block px-3 py-2 text-lg font-medium ${
                activeItem === 'SERVICES' ? 'bg-[#1A2735]' : ''
              }`}
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
            >
              SERVICES
            </a>
            <button className="text-[#8AABBD] hover:text-white block px-3 py-2 text-lg font-medium w-full text-left">
              LOGIN
            </button>
            <button className="bg-[#8AABBD] text-white block px-3 py-2 rounded-md text-lg font-medium w-full text-left hover:bg-[#7795a7]">
              SIGN UP
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

