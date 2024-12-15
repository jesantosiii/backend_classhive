import logo from '../assets/Logo/Logo.png'
import classhive from '../assets/ClasshiveLP.png'

export function Footer() {
    return (
      <footer className="bg-[#0A1628] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            {/* Logo */}
            <div className="mb-4 md:mb-0 flex items-center space-x-2 justify-center">
              <img src={logo} alt="logo" className="h-16 w-auto mt-[-10px]" />
              <img src={classhive} alt="ClassHive" className="h-8 w-auto" />
            </div>
          </div>
          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-gray-400">
            © 2024 ClassHive. All rights reserved | Terms of Service | Privacy Policy
          </div>
        </div>
      </footer>
    );
}
