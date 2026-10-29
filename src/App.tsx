import Header from './components/Header';
import Hero from './components/Hero';
import Guide from './components/Guide';
import Samples from './components/Samples';
import Order from './components/Order';
import Promise from './components/Promise';
import Faq from './components/Faq';
import Ask from './components/Ask';
import Footer from './components/Footer';
import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';

export default function App() {
  useLenis();
  useReveal('home');

  return (
    <>
      <a className="skip" href="#komnaty">К содержанию</a>
      <Header />
      <main>
        <Hero />
        <Guide />
        <Samples />
        <Order />
        <Promise />
        <Faq />
        <Ask />
      </main>
      <Footer />
    </>
  );
}
