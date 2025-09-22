import React from 'react'
import ItemCreateForm from '../../../components/shop/ItemCreateForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createItemThunk, fetchItemsThunk } from '../../../features/itemSlice'

function ItemCreatePage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onCreateSubmit = (itemData) => {
      dispatch(createItemThunk(itemData))
         .unwrap()
         .then((createdItem) => {
            console.log('상품 등록 성공:', createdItem)
            alert('상품이 성공적으로 등록되었습니다!')
            
            // 등록 후 상품 목록 새로고침
            dispatch(fetchItemsThunk())
            
            // 포인트샵 페이지로 이동 (등록된 상품 확인용)
            navigate('/pointshop')
         })
         .catch((error) => {
            console.error('상품 등록 에러:', error)
            alert('상품 등록에 실패했습니다: ' + error)
         })
   }

   return (
      <div className="container-fluid">
         <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
               <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                     <h1 className="h3 mb-0">
                        <iconify-icon icon="mdi:package-plus" width="24" height="24" className="mr-2"></iconify-icon>
                        상품 등록
                     </h1>
                  </div>
                  <div className="card-body p-4">
                     <ItemCreateForm onCreateSubmit={onCreateSubmit} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ItemCreatePage
