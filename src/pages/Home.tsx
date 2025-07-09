import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Services } from '@/components/landing/Services';
import { Portfolio } from '@/components/landing/Portfolio';
import { WhyChooseUs } from '@/components/landing/WhyChooseUs';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { Footer } from '@/components/landing/Footer';

function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-[#f7f5fa] dark:bg-[#18151c] font-sans antialiased">
        <Header />
        <main>
          <div className="container mx-auto px-4 max-w-[1300px]">
            <Hero />
            <Services />
            <Portfolio />
            <Pricing />
            <WhyChooseUs />
            <Testimonials />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Home;