import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material'
import { fetchItemsThunk } from '../../features/itemSlice'
import { formatWithComma } from '../../utils/priceSet'

function ItemSellList() {
   const dispatch = useDispatch()
   const { items, loading, error } = useSelector((state) => state.items)

   useEffect(() => {
      dispatch(fetchItemsThunk({}))
   }, [dispatch])

   if (loading) return null

   if (error) {
      return (
         <Typography variant="body1" align="center" color="error">
            에러발생: {String(error)}
         </Typography>
      )
   }

   return (
      <Box sx={{ padding: '20px' }}>
         {items?.length > 0 ? (
            <Box
               sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                     xs: 'repeat(1, 1fr)',
                     sm: 'repeat(2, 1fr)',
                     md: 'repeat(3, 1fr)',
                     lg: 'repeat(4, 1fr)',
                  },
                  gridAutoRows: 'auto',
                  gap: '16px',
                  justifyItems: 'center',
               }}
            >
               {items.map((item) => {
                  // 대표 이미지 안전 접근
                  const images = item.ItemImages ?? item.Imgs ?? []
                  const repImg = images.find((img) => img?.repImgYn === 'Y') ?? images[0]
                  const imageUrl = repImg?.imgUrl ? `${import.meta.env.VITE_APP_API_URL}${repImg.imgUrl}` : '/placeholder.png'
                  console.log('이미지 URL:', imageUrl)
                  return (
                     <Link key={item.id} to={`/items/detail/${item.id}`} style={{ textDecoration: 'none' }}>
                        <Card sx={{ width: 250 }}>
                           <CardMedia
                              component="img"
                              height="140"
                              image={imageUrl}
                              alt={item.itemNm ?? 'item image'}
                              onError={(e) => {
                                 e.currentTarget.src = '/placeholder.png'
                              }}
                           />
                           <CardContent>
                              <Typography variant="h6" component="div" noWrap>
                                 {item.itemNm}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                 포인트:{formatWithComma(String(item.price))}P
                              </Typography>
                           </CardContent>
                        </Card>
                     </Link>
                  )
               })}
            </Box>
         ) : (
            <Typography variant="body1" align="center">
               상품이 없습니다.
            </Typography>
         )}
      </Box>
   )
}

export default ItemSellList
