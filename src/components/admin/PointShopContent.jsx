import React, { useState } from 'react';
import AdminTableLayout from './common/AdminTableLayout';
import AdminBaseModal from '../modal/AdminBaseModal';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';
import FormTextarea from '../../components/common/FormTextarea';

const PointShopContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('pointshop-management');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    productName: '',
    category: '',
    point: '',
    stock: '',
    description: ''
  });

  // 파트너십 브랜드 데이터 (파트너십 관리에서 가져와야 함)
  const partnerBrands = [
    { value: '슈퍼빈', label: '슈퍼빈' },
    { value: '그린컴퍼니', label: '그린컴퍼니' },
    { value: '에코프렌즈', label: '에코프렌즈' },
    { value: '네이처텍', label: '네이처텍' }
  ];

  // 서브 탭 목록
  const subTabs = [
    { id: 'pointshop-management', label: '포인트샵 상품 관리', icon: 'mdi:shopping' },
    { id: 'anabada-management', label: '아나바다장터 관리', icon: 'mdi:recycle' }
  ];

  // 포인트샵 상품 데이터
  const pointshopData = [
    {
      id: 1,
      '브랜드': '000',
      '상품명': '친환경 칫솔',
      '카테고리': '생활용품',
      '포인트': '100P',
      '재고': '50개',
      '판매량': '25개',
      '등록일': '2025-01-10',
      '상태': '판매중',
      '이미지': 'toothbrush.jpg',
      '설명': '천연 재료로 만든 친환경 칫솔',
      '인기상품': 'Y'
    },
    {
      id: 2,
      '브랜드': '000',
      '상품명': '친환경 수건',
      '카테고리': '생활용품',
      '포인트': '150P',
      '재고': '30개',
      '판매량': '15개',
      '등록일': '2025-01-09',
      '상태': '판매중',
      '이미지': 'towel.jpg',
      '설명': '유기농 면으로 제작된 친환경수건',
      '인기상품': 'N'
    },
    {
      id: 3,
      '브랜드': '000',
      '상품명': '태양광 충전기',
      '카테고리': '전자제품',
      '포인트': '300P',
      '재고': '0개',
      '판매량': '8개',
      '등록일': '2025-01-08',
      '상태': '품절',
      '이미지': 'solar_charger.jpg',
      '설명': '태양광으로 충전하는 친환경 충전기',
      '인기상품': 'Y'
    },
    {
      id: 4,
      '브랜드': '000',
      '상품명': '나무 조명',
      '카테고리': '홈데코',
      '포인트': '250P',
      '재고': '15개',
      '판매량': '5개',
      '등록일': '2025-01-07',
      '상태': '판매중',
      '이미지': 'wood_lamp.jpg',
      '설명': '자연 나무로 만든 조명',
      '인기상품': 'N'
    }
  ];

  // 아나바다장터 상품 데이터
  const anabadaData = [
    {
      id: 1,
      '상품명': '중고 자전거',
      '판매자': 'user001',
      '카테고리': '운동용품',
      '가격': '50,000원',
      '상태': '판매중',
      '등록일': '2025-01-15',
      '조회수': '45',
      '찜하기': '12',
      '지역': '서울시 강남구',
      '상품상태': '상',
      '거래방법': '직거래',
      '승인상태': '승인완료'
    },
    {
      id: 2,
      '상품명': '친환경 세제',
      '판매자': 'user002',
      '카테고리': '생활용품',
      '가격': '15,000원',
      '상태': '판매중',
      '등록일': '2025-01-14',
      '조회수': '23',
      '찜하기': '8',
      '지역': '경기도 수원시',
      '상품상태': '중',
      '거래방법': '택배',
      '승인상태': '승인완료'
    },
    {
      id: 3,
      '상품명': '부적절한 상품명',
      '판매자': 'user003',
      '카테고리': '기타',
      '가격': '100,000원',
      '상태': '신고됨',
      '등록일': '2025-01-13',
      '조회수': '5',
      '찜하기': '0',
      '지역': '부산시 해운대구',
      '상품상태': '하',
      '거래방법': '직거래',
      '승인상태': '승인대기'
    }
  ];

  // 서브탭별 컬럼 설정
  const getColumns = () => {
    switch (activeSubTab) {
      case 'pointshop-management':
        return ['브랜드', '상품명', '카테고리', '포인트', '재고', '판매량', '등록일', '상태'];
      case 'anabada-management':
        return ['상품명', '판매자', '카테고리', '가격', '지역', '등록일', '조회수', '승인상태', '상태'];
      default:
        return [];
    }
  };

  // 서브탭별 데이터 설정
  const getData = () => {
    switch (activeSubTab) {
      case 'pointshop-management':
        return pointshopData;
      case 'anabada-management':
        return anabadaData;
      default:
        return [];
    }
  };

  // 서브탭별 필터 옵션
  const getFilterOptions = () => {
    switch (activeSubTab) {
      case 'pointshop-management':
        return {
          category: {
            label: '카테고리',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '생활용품', label: '생활용품' },
              { value: '전자제품', label: '전자제품' },
              { value: '홈데코', label: '홈데코' },
              { value: '사무용품', label: '사무용품' },
              { value: '운동용품', label: '운동용품' }
            ]
          },
    status: {
      label: '상태',
      type: 'select',
      options: [
              { value: '', label: '전체' },
        { value: '판매중', label: '판매중' },
        { value: '품절', label: '품절' },
              { value: '판매중단', label: '판매중단' },
              { value: '임시저장', label: '임시저장' }
            ]
          },
          popular: {
            label: '인기상품',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: 'Y', label: '인기상품' },
              { value: 'N', label: '일반상품' }
      ]
    },
    productName: {
      label: '상품명',
      type: 'input',
      placeholder: '상품명을 입력하세요'
          },
          pointRange: {
            label: '포인트 범위',
            type: 'range',
            placeholder: { min: '최소 포인트', max: '최대 포인트' }
          },
          stockRange: {
            label: '재고 범위',
            type: 'range',
            placeholder: { min: '최소 재고', max: '최대 재고' }
          },
          salesRange: {
            label: '판매량 범위',
            type: 'range',
            placeholder: { min: '최소 판매량', max: '최대 판매량' }
          },
          dateRange: {
            label: '등록일',
            type: 'daterange'
          }
        };
      case 'anabada-management':
        return {
          category: {
            label: '카테고리',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '생활용품', label: '생활용품' },
              { value: '전자제품', label: '전자제품' },
              { value: '의류', label: '의류' },
              { value: '운동용품', label: '운동용품' },
              { value: '도서', label: '도서' },
              { value: '기타', label: '기타' }
            ]
          },
          approvalStatus: {
            label: '승인상태',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '승인완료', label: '승인완료' },
              { value: '승인대기', label: '승인대기' },
              { value: '승인거부', label: '승인거부' },
              { value: '재검토', label: '재검토' }
            ]
          },
          status: {
            label: '상태',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '판매중', label: '판매중' },
              { value: '판매완료', label: '판매완료' },
              { value: '신고됨', label: '신고됨' },
              { value: '블라인드', label: '블라인드' },
              { value: '삭제됨', label: '삭제됨' }
            ]
          },
          productCondition: {
            label: '상품상태',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '상', label: '상' },
              { value: '중', label: '중' },
              { value: '하', label: '하' }
            ]
          },
          tradeMethod: {
            label: '거래방법',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '직거래', label: '직거래' },
              { value: '택배', label: '택배' },
              { value: '직거래+택배', label: '직거래+택배' }
            ]
          },
          seller: {
            label: '판매자',
            type: 'input',
            placeholder: '판매자 ID를 입력하세요'
          },
          productName: {
            label: '상품명',
            type: 'input',
            placeholder: '상품명을 입력하세요'
          },
          region: {
            label: '지역',
            type: 'input',
            placeholder: '지역을 입력하세요'
          },
          priceRange: {
            label: '가격 범위',
            type: 'range',
            placeholder: { min: '최소 가격', max: '최대 가격' }
          },
          viewRange: {
            label: '조회수 범위',
            type: 'range',
            placeholder: { min: '최소 조회수', max: '최대 조회수' }
          },
          dateRange: {
            label: '등록일',
            type: 'daterange'
          }
        };
      default:
        return {};
    }
  };

  // 서브탭별 액션 버튼
  const getActionButtons = () => {
    switch (activeSubTab) {
      case 'pointshop-management':
        return [
    {
      label: '상품 추가',
      className: 'btn default main1',
            onClick: () => handleAdd()
          },
          {
            label: '일괄 상태 변경',
            className: 'btn default main2',
            onClick: () => console.log('일괄 상태 변경')
          },
          {
            label: '재고 일괄 업데이트',
            className: 'btn btn-info',
            onClick: () => console.log('재고 일괄 업데이트')
          },
          {
            label: '엑셀 다운로드',
            className: 'btn btn-success',
            onClick: () => console.log('엑셀 다운로드')
          }
        ];
      case 'anabada-management':
        return [
          {
            label: '일괄 승인',
            className: 'btn default main1',
            onClick: () => console.log('일괄 승인')
          },
          {
            label: '일괄 거부',
            className: 'btn default main3',
            onClick: () => console.log('일괄 거부')
          },
          {
            label: '일괄 블라인드',
            className: 'btn btn-warning',
            onClick: () => console.log('일괄 블라인드')
          },
          {
            label: '신고 관리',
            className: 'btn btn-danger',
            onClick: () => console.log('신고 관리')
          }
        ];
      default:
        return [];
    }
  };

  // 폼 데이터 변경 핸들러
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 상품 추가 핸들러
  const handleAdd = () => {
    setModalType('add');
    setSelectedItem(null);
    setFormData({
      brand: '',
      productName: '',
      category: '',
      point: '',
      stock: '',
      description: ''
    });
    setShowModal(true);
  };

  // 더블클릭 핸들러
  const handleDoubleClick = (item) => {
    setModalType('edit');
    setSelectedItem(item);
    if (activeSubTab === 'pointshop-management') {
      setFormData({
        brand: item?.['브랜드'] || '',
        productName: item?.['상품명'] || '',
        category: item?.['카테고리'] || '',
        point: item?.['포인트']?.replace('P', '') || '',
        stock: item?.['재고']?.replace('개', '') || '',
        description: item?.['설명'] || ''
      });
    } else {
      setFormData({
        productName: item?.['상품명'] || '',
        category: item?.['카테고리'] || '',
        point: item?.['포인트']?.replace('P', '') || '',
        stock: item?.['재고']?.replace('개', '') || '',
        description: item?.['설명'] || ''
      });
    }
    setShowModal(true);
  };

  // 일괄 삭제 핸들러
  const handleBulkDelete = (selectedItems) => {
    console.log('일괄 삭제:', selectedItems);
  };

  return (
    <div className="pointshop-content">
      {/* 서브 탭 네비게이션 */}
      <div className="sub-tabs mb-4">
        <div className="d-flex flex-wrap gap-2">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              className={`btn ${activeSubTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              <iconify-icon icon={tab.icon} className="me-2"></iconify-icon>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 서브탭별 컨텐츠 */}
      <AdminTableLayout
        title={subTabs.find(tab => tab.id === activeSubTab)?.label || '포인트샵 관리'}
        columns={getColumns()}
        data={getData()}
        filterOptions={getFilterOptions()}
        actionButtons={getActionButtons()}
        currentPage={1}
        totalPages={Math.ceil(getData().length / 10)}
        onPageChange={(page) => console.log('페이지 변경:', page)}
        enableCheckbox={true}
        enableDoubleClick={true}
        onRowDoubleClick={handleDoubleClick}
        onBulkDelete={handleBulkDelete}
      />


      {/* 상품 관리 모달 */}
      <AdminBaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          activeSubTab === 'pointshop-management' 
            ? (modalType === 'add' ? '포인트샵 상품 추가' : '포인트샵 상품 수정')
            : (modalType === 'add' ? '아나바다 상품 추가' : '아나바다 상품 수정')
        }
        size="lg"
      >
        <div className="admin-modal-content">
          <form>
            <div className="row">
              {/* 포인트샵 상품 관리일 때만 브랜드 필드 표시 */}
              {activeSubTab === 'pointshop-management' && (
                <div className="col-md-6">
                  <FormSelect
                    label="브랜드"
                    value={formData.brand}
                    onChange={(e) => handleFormChange('brand', e.target.value)}
                    options={partnerBrands}
                    placeholder="브랜드 선택"
                    required={true}
                  />
                </div>
              )}
              <div className={activeSubTab === 'pointshop-management' ? "col-md-6" : "col-md-6"}>
                <FormInput
                  label="상품명"
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleFormChange('productName', e.target.value)}
                  placeholder="상품명을 입력하세요"
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <FormSelect
                  label="카테고리"
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  options={[
                    { value: '생활용품', label: '생활용품' },
                    { value: '전자제품', label: '전자제품' },
                    { value: '홈데코', label: '홈데코' },
                    { value: '사무용품', label: '사무용품' }
                  ]}
                  placeholder="카테고리 선택"
                  required={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormInput
                  label="포인트"
                  type="number"
                  value={formData.point}
                  onChange={(e) => handleFormChange('point', e.target.value)}
                  placeholder="포인트를 입력하세요"
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <FormInput
                  label="재고 수량"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleFormChange('stock', e.target.value)}
                  placeholder="재고 수량을 입력하세요"
                  required={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <FormTextarea
                  label="상품 설명"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="상품에 대한 설명을 입력하세요"
                  rows={3}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-20">
              <button type="button" className="btn default" onClick={() => setShowModal(false)}>
                취소
              </button>
              <button type="submit" className="btn default main1">
                {modalType === 'add' ? '추가' : '수정'}
              </button>
            </div>
          </form>

          {/* 아나바다 상품 상세 정보 (수정 모드일 때만) */}
          {modalType === 'edit' && (
            <div className="mt-4 pt-4 border-top">
              <h6>상품 정보</h6>
              <div className="info-grid">
                <div className="info-row">
                  <span className="label">상품명</span>
                  <span className="value">{selectedItem?.['상품명']}</span>
                </div>
                <div className="info-row">
                  <span className="label">판매자</span>
                  <span className="value">{selectedItem?.['판매자']}</span>
                </div>
                <div className="info-row">
                  <span className="label">가격</span>
                  <span className="value">{selectedItem?.['가격']}</span>
                </div>
                <div className="info-row">
                  <span className="label">지역</span>
                  <span className="value">{selectedItem?.['지역']}</span>
                </div>
                <div className="info-row">
                  <span className="label">상품상태</span>
                  <span className="value">{selectedItem?.['상품상태']}</span>
                </div>
                <div className="info-row">
                  <span className="label">거래방법</span>
                  <span className="value">{selectedItem?.['거래방법']}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <h6>관리 액션</h6>
                <div className="d-flex gap-2 flex-wrap">
                  <button className="btn default main1" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>승인</button>
                  <button className="btn default main3" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>거부</button>
                  <button className="btn default main2" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>블라인드</button>
                  <button className="btn default" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>판매자 연락</button>
                  <button className="btn default" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>신고 내역 보기</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminBaseModal>
    </div>
  );
};

export default PointShopContent;