// re-erearth-frontend/src/pages/public/Landing/LandingPage.jsx
import IntroSection from './sections/IntroSection'
import PanelFull from './sections/PanelFull'
import ReEarthSection from './sections/ReEarthSection'
import SolutionInActionSection from './sections/SolutionInActionSection'
import CarbonPointSection from './sections/CarbonPointSection'

import './landing.scss'

export default function LandingPage() {
   return (
      <div className="wrap">
         <main className="snap">
            <IntroSection />
            <PanelFull />
            <ReEarthSection />
            <SolutionInActionSection />
           <CarbonPointSection totalCO2="12,345" unitCO2="kg" totalPoint="98,765" unitPoint="P" treeCount="1,234" />
         </main>
      </div>
   )
}
