import React from 'react'
import '../../../styles/landing/landing.css'
import IntroSection from './sections/IntroSection'
import PanelFull from './sections/PanelFull'
import ReEarthSection from './sections/ReEarthSection'
import SolutionInActionSection from './sections/SolutionInActionSection'

export default function LandingPage() {
   return (
      <div className="wrap">
         <main className="snap">
            <IntroSection />
            <PanelFull />
            <ReEarthSection />
            <SolutionInActionSection />
         </main>
      </div>
   )
}
