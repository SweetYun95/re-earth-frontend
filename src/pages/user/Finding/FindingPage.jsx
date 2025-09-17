import FindForm from './FindForm'
import FindSuccessForm from './FindSuccessForm'
import FindFailForm from './FindFailForm'
import PasswordSearchForm from './PasswordSearchForm'
import ReissuePassword from './ReissuePasswordForm'
import './Finding.scss'
function IdfindPage() {
   return (
      <>
         <section id="main1">
            
            <div id="area" className="container">
               <div id="login">
                  <FindForm />
                  <FindSuccessForm />
                  <FindFailForm />
                  <PasswordSearchForm />
                  <ReissuePassword />
               </div>
            </div>
         </section>
      </>
   )
}
export default IdfindPage
