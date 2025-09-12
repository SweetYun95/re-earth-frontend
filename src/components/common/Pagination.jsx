import beforeIcon from '../../assets/icons/before.svg'
import afterIcon from '../../assets/icons/after.svg'
function Pagination({ pagination }) {
   const pages = [1, 2, 3]
   return (
      <div id="pagination" className="mt-20">
         <img src={beforeIcon} alt="" />
         <div className="pages">
            {pages.map((page) => (
               <div className="number">{page}</div>
            ))}
         </div>

         <img src={afterIcon} alt="" />
      </div>
   )
}

export default Pagination
