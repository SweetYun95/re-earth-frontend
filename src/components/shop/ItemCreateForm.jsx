import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { useState } from 'react'
import { formatWithComma, stripComma } from '../../utils/priceSet'

function ItemCreateForm({ onCreateSubmit }) {
   const [imgUrls, setImgUrls] = useState([]) // 이미지 경로(여러개 저장)
   const [imgFiles, setImgFiles] = useState([]) // 이미지 파일 객체(여러개 저장)
   const [itemNm, setItemNm] = useState('') // 상품명
   const [price, setPrice] = useState('') // 가격
   const [stockNumber, setStockNumber] = useState('') // 재고
   const [itemSellStatus, setItemSellStatus] = useState('SELL') // 판매상태
   const [itemDetail, setItemDetail] = useState('') // 상품설명
   const [brandName, setBrandName] = useState('') //브랜드명
   const [vendorName, setVendorName] = useState('') //업체명

   // 이미지 미리보기
   const handleImageChange = (e) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      const newFiles = Array.from(files).slice(0, 5)
      console.log(newFiles)

      setImgFiles(newFiles)

      const newImgUrls = newFiles.map((file) => {
         const reader = new FileReader()
         reader.readAsDataURL(file) // 파일 데이터 읽기

         return new Promise((resolve) => {
            reader.onload = (event) => {
               resolve(event.target.result)
            }
         })
      })

      Promise.all(newImgUrls).then((urls) => {
         setImgUrls(urls)
      })
   }

   // 상품 등록
   const handleSubmit = (e) => {
      e.preventDefault()

      if (!itemNm.trim()) {
         alert('상품명을 입력하세요!')
         return
      }

      if (!String(price).trim()) {
         alert('가격을 입력하세요!')
         return
      }

      if (!String(stockNumber).trim()) {
         alert('재고를 입력하세요.')
         return
      }
      if (!String(brandName).trim()) {
         alert('브랜드명을 입력하세요.')
         return
      }
      if (!String(vendorName).trim()) {
         alert('업체명을 입력하세요.')
         return
      }

      if (imgFiles.length === 0) {
         alert('이미지 최소 1개 이상 업로드 하세요.')
         return
      }

      const formData = new FormData()
      formData.append('itemNm', itemNm)
      formData.append('price', price)
      formData.append('stockNumber', stockNumber)
      formData.append('itemSellStatus', itemSellStatus)
      formData.append('itemDetail', itemDetail)
      formData.append('brandName', brandName)
      formData.append('vendorName', vendorName)

      imgFiles.forEach((file) => {
         const encodedFile = new File([file], encodeURIComponent(file.name), { type: file.type })
         formData.append('img', encodedFile)
      })

      onCreateSubmit(formData)
   }

   const handlePriceChange = (e) => {
      const rawValue = e.target.value
      const numericValue = stripComma(rawValue)

      const isNumric = /^\d*$/
      if (!isNumric.test(numericValue)) return

      setPrice(numericValue)
   }

   const handleStockChange = (e) => {
      const rawValue = e.target.value

      const isNumric = /^\d*$/
      if (!isNumric.test(rawValue)) return

      setStockNumber(rawValue)
   }

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드 (최대 5개)
            <input type="file" name="img" accept="image/*" hidden multiple onChange={handleImageChange} />
         </Button>

         {/* 업로드된 이미지 미리보기 */}
         <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            mt={2}
            sx={{
               justifyContent: 'flex-start',
            }}
         >
            {imgUrls.map((url, index) => (
               <Box
                  key={index}
                  sx={{
                     width: '120px',
                     height: '120px',
                     border: '1px solid #ccc',
                     borderRadius: '8px',
                     overflow: 'hidden',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <img src={url} alt={`업로드 이미지 ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </Box>
            ))}
         </Box>

         {/* 상품명 입력 필드 */}
         <TextField label="상품명" variant="outlined" fullWidth value={itemNm} onChange={(e) => setItemNm(e.target.value)} placeholder="상품명" sx={{ mt: 2 }} inputProps={{ maxLength: 15 }} />

         {/* 가격 입력 필드 */}
         {/* input type='text'에 입력한 텍스트는 숫자여도 JS에서는 문자로 인식한다 */}
         <TextField
            label="가격"
            variant="outlined"
            fullWidth
            value={formatWithComma(price)} // 콤마 추가된 값 표시
            onChange={handlePriceChange} // 입력 핸들러
            placeholder="가격"
            sx={{ mt: 2 }}
            inputProps={{ maxLength: 10 }}
         />

         {/* 재고 입력 필드 */}
         <TextField label="재고수량" variant="outlined" fullWidth value={stockNumber} onChange={handleStockChange} placeholder="재고수량" sx={{ mt: 2 }} inputProps={{ maxLength: 10 }} />

         {/* 판매 상태 선택 필드 */}
         <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="item-sell-status-label">판매 상태</InputLabel>
            <Select labelId="item-sell-status-label" label="판매상태" value={itemSellStatus} onChange={(e) => setItemSellStatus(e.target.value)}>
               {/* value는 실제 items 테이블의 itemSellStatus 컬럼에 저장될 값 */}
               <MenuItem value="SELL">판매중</MenuItem>
               <MenuItem value="SOLD_OUT">품절</MenuItem>
            </Select>
         </FormControl>

         {/* 상품설명 입력 필드 */}
         <TextField label="상품설명" variant="outlined" fullWidth multiline rows={4} value={itemDetail} onChange={(e) => setItemDetail(e.target.value)} sx={{ mt: 2 }} />

         {/* 업체명 입력 필드 */}
         <TextField label="업체명" variant="outlined" fullWidth multiline rows={4} value={vendorName} onChange={(e) => setVendorName(e.target.value)} sx={{ mt: 2 }} />

         {/* 브랜드명 입력 필드 */}
         <TextField label="브랜드명" variant="outlined" fullWidth multiline rows={4} value={brandName} onChange={(e) => setBrandName(e.target.value)} sx={{ mt: 2 }} />

         {/* 등록 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            등록하기
         </Button>
      </Box>
   )
}

export default ItemCreateForm
