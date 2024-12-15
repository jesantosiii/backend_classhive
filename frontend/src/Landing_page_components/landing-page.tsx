import { Navbar } from './navbar';
import { Hero } from './hero';
import { About } from './about';
import { Services } from './services';
import { Footer } from './footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
