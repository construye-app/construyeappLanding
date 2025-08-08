import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Services } from '@/components/landing/Services';
import { Technology } from '@/components/landing/Technology';
import { Portfolio } from '@/components/landing/Portfolio';
import { WhyChooseUs } from '@/components/landing/WhyChooseUs';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { Footer } from '@/components/landing/Footer';
import { BrandCarousel } from '@/components/landing/BrandCarousel';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-[#f7f5fa] font-sans antialiased">
        <Header />
        <main>
           <Hero />
          <div className="container mx-auto px-4 max-w-[1300px]">
            <BrandCarousel />
            <Services />
            <Technology />
            <Portfolio />
            <Pricing />
            <WhyChooseUs />
            <Testimonials />
          </div>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </ThemeProvider>
  );
}

export default Home;