import { PageEffects } from '@/app/components/PageEffects'
import { Navbar }      from '@/app/components/layout/Navbar'
import { Footer }      from '@/app/components/layout/Footer'
import { Hero }        from '@/app/components/home/Hero'
import { Marquee }     from '@/app/components/home/Marquee'
import { About }       from '@/app/components/home/About'
import { Services }    from '@/app/components/home/Services'
import { Gallery }     from '@/app/components/home/Gallery'
import { Process }     from '@/app/components/home/Process'

export default function Home() {
  return (
    <>
      <PageEffects />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
        <Process />
      </main>
      <Footer />
    </>
  )
}
