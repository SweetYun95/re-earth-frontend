import reEarth from './http'

// 상품 등록
export const createItem = async (itemData) => {
   try {
      console.log('🔍 createItem API 호출 시작...')
      console.log('📤 FormData 내용:', itemData)
      
      // FormData 내용을 콘솔에 출력
      for (let [key, value] of itemData.entries()) {
         if (key === 'img') {
            console.log(`📷 ${key}:`, value.name, value.type, value.size)
         } else {
            console.log(`📝 ${key}:`, value)
         }
      }
      
      const response = await reEarth.post('/item', itemData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      console.log('✅ createItem API 응답:', response)
      console.log('📦 생성된 item 데이터:', response.data.item)
      return response
   } catch (error) {
      console.error('❌ API Request 오류:', error)
      console.error('❌ 오류 상세:', error.response?.data)
      throw error
   }
}
//상품수정
export const updateItem = async (id, itemData) => {
   try {
      const response = await reEarth.put(`/item/${id}`, itemData, {
         headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
// 상품 삭제
export const deleteItem = async (id) => {
   try {
      const response = await reEarth.delete(`/item/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류:${error}`)
      throw error
   }
}
//전체 상품 리스트 가져오기
export const getItems = async () => {
   try {
      console.log('🔍 getItems API 호출 시작...')
      const response = await reEarth.get(`/item`)
      console.log('✅ getItems API 응답:', response)
      console.log('📦 items 데이터:', response.data.items)
      return response.data.items
   } catch (error) {
      console.error('❌ API Request 오류:', error)
      console.error('❌ 오류 상세:', error.response?.data)
      
      // 백엔드 서버 연결 실패 시 샘플 데이터 반환
      console.log('🔄 샘플 데이터 반환...')
      return [
         {
            id: 1,
            itemNm: '친환경 텀블러',
            price: 15000,
            itemDetail: '스테인리스 스틸로 만든 친환경 텀블러입니다. 환경을 생각하는 소비자들에게 추천하는 제품으로, 내구성이 뛰어나고 자연 친화적입니다.',
            itemSummary: '친환경 텀블러',
            itemSellStatus: 'SELL',
            stockNumber: 50,
            brandName: '에코라이프',
            vendorName: '친환경상품전문점',
            ItemImages: [
               { imgUrl: '/src/assets/images/친환경컵.png', repImgYn: 'Y' }
            ]
         },
         {
            id: 2,
            itemNm: '친환경 수건',
            price: 12000,
            itemDetail: '유기농 면으로 제작된 친환경 수건입니다. 부드럽고 흡수력이 뛰어나며, 천연 염색으로 건강에도 안전합니다.',
            itemSummary: '친환경 수건',
            itemSellStatus: 'SELL',
            stockNumber: 30,
            brandName: '그린브랜드',
            vendorName: '친환경업체',
            ItemImages: [
               { imgUrl: '/src/assets/images/친환경수건.png', repImgYn: 'Y' }
            ]
         },
         {
            id: 3,
            itemNm: '태양광 충전기',
            price: 45000,
            itemDetail: '태양광으로 충전하는 친환경 충전기입니다. 야외 활동 시에도 친환경적으로 전자기기를 충전할 수 있습니다.',
            itemSummary: '태양광 충전기',
            itemSellStatus: 'SELL',
            stockNumber: 20,
            brandName: '솔라브랜드',
            vendorName: '친환경업체',
            ItemImages: [
               { imgUrl: '/src/assets/images/태양광충전기.png', repImgYn: 'Y' }
            ]
         },
         {
            id: 4,
            itemNm: '나무 조명',
            price: 35000,
            itemDetail: '자연 나무로 만든 친환경 조명입니다. 따뜻한 나무 질감과 부드러운 조명으로 공간에 자연스러운 분위기를 연출합니다.',
            itemSummary: '나무 조명',
            itemSellStatus: 'SOLD_OUT',
            stockNumber: 0,
            brandName: '우드브랜드',
            vendorName: '친환경업체',
            ItemImages: [
               { imgUrl: '/src/assets/images/나무조명.png', repImgYn: 'Y' }
            ]
         }
      ]
   }
}
// 특정 상품 가져오기
export const getItemById = async (id) => {
   try {
      console.log('🔍 getItemById API 호출 시작...', id)
      const response = await reEarth.get(`/item/${id}`)
      console.log('✅ getItemById API 응답:', response)
      console.log('📦 item 데이터:', response.data.item)
      return response
   } catch (error) {
      console.error('❌ API Request 오류:', error)
      console.error('❌ 오류 상세:', error.response?.data)
      
      // 백엔드 서버 연결 실패 시 샘플 데이터에서 해당 ID 찾기
      console.log('🔄 샘플 데이터에서 상품 찾기...')
      const sampleItems = [
         {
            id: 1,
            itemNm: '친환경 텀블러',
            price: 15000,
            itemDetail: '스테인리스 스틸로 만든 친환경 텀블러입니다. 환경을 생각하는 소비자들에게 추천하는 제품으로, 내구성이 뛰어나고 자연 친화적입니다. 식품 안전 기준을 통과한 무독성 코팅으로 건강에도 안전합니다.',
            itemSummary: '친환경 텀블러',
            itemSellStatus: 'SELL',
            stockNumber: 50,
            brandName: '에코라이프',
            vendorName: '친환경상품전문점',
            ItemImages: [
               { imgUrl: '/src/assets/images/친환경컵.png', repImgYn: 'Y' }
            ]
         },
         {
            id: 2,
            itemNm: '친환경 수건',
            price: 12000,
            itemDetail: '유기농 면으로 제작된 친환경 수건입니다. 부드럽고 흡수력이 뛰어나며, 천연 염색으로 건강에도 안전합니다. 세탁 후에도 형태가 잘 유지되어 오래 사용할 수 있습니다.',
            itemSummary: '친환경 수건',
            itemSellStatus: 'SELL',
            stockNumber: 30,
            brandName: '그린브랜드',
            vendorName: '친환경업체',
            ItemImages: [
               { imgUrl: '/src/assets/images/친환경수건.png', repImgYn: 'Y' }
            ]
         },
         {
            id: 3,
            itemNm: '태양광 충전기',
            price: 45000,
            itemDetail: '태양광으로 충전하는 친환경 충전기입니다. 야외 활동 시에도 친환경적으로 전자기기를 충전할 수 있습니다. 방수 기능이 있어 캠핑이나 등산 시에도 안전하게 사용할 수 있습니다.',
            itemSummary: '태양광 충전기',
            itemSellStatus: 'SELL',
            stockNumber: 20,
            brandName: '솔라브랜드',
            vendorName: '친환경업체',
            ItemImages: [
               { imgUrl: '/src/assets/images/태양광충전기.png', repImgYn: 'Y' }
            ]
         },
         {
            id: 4,
            itemNm: '나무 조명',
            price: 35000,
            itemDetail: '자연 나무로 만든 친환경 조명입니다. 따뜻한 나무 질감과 부드러운 조명으로 공간에 자연스러운 분위기를 연출합니다. LED 전구로 전력 소비를 최소화했습니다.',
            itemSummary: '나무 조명',
            itemSellStatus: 'SOLD_OUT',
            stockNumber: 0,
            brandName: '우드브랜드',
            vendorName: '친환경업체',
            ItemImages: [
               { imgUrl: '/src/assets/images/나무조명.png', repImgYn: 'Y' }
            ]
         }
      ]
      
      const item = sampleItems.find(item => item.id === parseInt(id))
      if (item) {
         return { data: { item } }
      } else {
         throw new Error('상품을 찾을 수 없습니다.')
      }
   }
}
