import './donateform.scss'
import DonateForm1 from './Form/DonateForm1'
import DonateForm2 from './Form/DonateForm2'
import DonateForm3 from './Form/DonateForm3'
import DonateForm4 from './Form/DonateForm4'
function DonationPage() {
   return (
      <>
         <section id="main1">
            <div id="area" className="container">
               <div id="donation">
                  <h2>Re:earth</h2>

                  {/* <DonateForm1 /> */}
                  {/* <DonateForm2 /> */}
                  {/* <DonateForm3 /> */}
                  <DonateForm4 />
               </div>
            </div>
         </section>
      </>
   )
}

export default DonationPage
