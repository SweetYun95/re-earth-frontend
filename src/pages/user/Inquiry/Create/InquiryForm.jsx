// re-earth-frontend/src/pages/user/Inquiry/Create/InquiryForm.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createQnaThunk } from '../../../../features/qnaSlice'
import './inquiryForm.scss'

function InquiryForm() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { loading } = useSelector((s) => s.qna || {})
   const [form, setForm] = useState({
      title: '',
      category: '배송',
      content: '',
   })

   const onChange = (e) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const title = form.title.trim()
      const question = form.content.trim() // 백엔드 필드명: question

      if (!title) return alert('제목을 입력하세요.')
      if (!question) return alert('내용을 입력하세요.')

      try {
         await dispatch(createQnaThunk({ title, question })).unwrap()
         alert('문의가 성공적으로 등록되었습니다!')
         navigate('/user/my')
      } catch (err) {
         console.error(err)
         alert(typeof err?.message === 'string' ? err.message : '문의 등록 실패')
      }
   }

   const handleBack = () => navigate(-1)

   return (
      <section id="main1">
         <div className="container" id="area">
            <form className="inquire mt-80" onSubmit={handleSubmit}>
               <h2>1:1 문의</h2>
               <div className="inquire--header mt-80">
                  <input type="text" name="title" placeholder="제목을 입력하세요." value={form.title} onChange={onChange} disabled={loading} />
                  <select name="category" value={form.category} onChange={onChange} disabled={loading}>
                     <option value="배송">배송</option>
                     <option value="기부">기부</option>
                     <option value="인증/적립">인증/적립</option>
                     <option value="주문/결제">주문/결제</option>
                     <option value="서비스">서비스</option>
                     <option value="기타">기타</option>
                  </select>
               </div>

               <textarea className="mt-40" name="content" placeholder="내용을 입력하세요." rows={15} value={form.content} onChange={onChange} disabled={loading} />

               <div className="group mt-40">
                  <button type="button" className="btn default main2" onClick={handleBack} disabled={loading}>
                     돌아가기
                  </button>
                  <button type="submit" className="btn default main1" disabled={loading}>
                     {loading ? '등록 중…' : '작성하기'}
                  </button>
               </div>
            </form>
         </div>
      </section>
   )
}

export default InquiryForm
