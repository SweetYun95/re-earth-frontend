import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileEditPage.scss';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '홍길동',
    nickname: '진한청자13',
    phone1: '010',
    phone2: '1234',
    phone3: '5678',
    email: 'example@gmail.com',
    address: '반곡역로 116',
    addressDetail: '1111동 1111호'
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // 프로필 수정 로직
    console.log('프로필 수정:', formData);
    navigate('/user/mypage');
  };

  const handlePasswordSubmit = () => {
    // 비밀번호 변경 로직
    console.log('비밀번호 변경:', passwordData);
    setShowChangePasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="profile-edit">
      {/* 헤더 */}
      <div className="profile-edit__header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <button 
                className="profile-edit__back-btn"
                onClick={() => navigate('/user/mypage')}
              >
                비밀번호 찾기 모달
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="container-fluid profile-edit__content">
        <div className="row h-100">
          {/* 좌측 사이드바 */}
          <div className="col-lg-3 col-md-4 profile-edit__left">
            <div className="profile-edit__avatar-section">
              <div className="profile-edit__avatar mb-4">
                <img src="/src/assets/icons/profile.png" alt="프로필" className="img-fluid" />
              </div>
              <button className="btn default main3 profile-edit__photo-btn mb-3 w-100">
                프로필 사진 변경
              </button>
              <button 
                className="btn default main4 profile-edit__password-btn w-100"
                onClick={() => setShowChangePasswordModal(true)}
              >
                비밀번호 변경
              </button>
            </div>
          </div>

          {/* 우측 메인 영역 */}
          <div className="col-lg-9 col-md-8 profile-edit__right">
            <div className="row">
              <div className="col-12">
                <h2 className="profile-edit__title mb-4">내 정보 수정</h2>
              </div>
            </div>
            
            <form className="profile-edit__form">
              {/* 이름 */}
              <div className="row mb-4">
                <div className="col-12">
                  <label className="profile-edit__label">이름</label>
                  <div className="row">
                    <div className="col-8 col-md-9">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control profile-edit__input"
                      />
                    </div>
                    <div className="col-4 col-md-3">
                      <button type="button" className="btn default main1 w-100">중복 확인</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 닉네임 */}
              <div className="row mb-4">
                <div className="col-12">
                  <label className="profile-edit__label">닉네임</label>
                  <div className="row">
                    <div className="col-8 col-md-9">
                      <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        className="form-control profile-edit__input"
                      />
                    </div>
                    <div className="col-4 col-md-3">
                      <button type="button" className="btn default main1 w-100">중복 확인</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 휴대폰번호 */}
              <div className="row mb-4">
                <div className="col-12">
                  <label className="profile-edit__label">휴대폰번호</label>
                  <div className="row align-items-center">
                    <div className="col-3">
                      <input
                        type="text"
                        name="phone1"
                        value={formData.phone1}
                        onChange={handleInputChange}
                        maxLength="3"
                        className="form-control profile-edit__input text-center"
                      />
                    </div>
                    <div className="col-1 text-center">
                      <span>-</span>
                    </div>
                    <div className="col-3">
                      <input
                        type="text"
                        name="phone2"
                        value={formData.phone2}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="form-control profile-edit__input text-center"
                      />
                    </div>
                    <div className="col-1 text-center">
                      <span>-</span>
                    </div>
                    <div className="col-3">
                      <input
                        type="text"
                        name="phone3"
                        value={formData.phone3}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="form-control profile-edit__input text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 이메일 */}
              <div className="row mb-4">
                <div className="col-12">
                  <label className="profile-edit__label">이메일</label>
                  <div className="row">
                    <div className="col-8 col-md-9">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control profile-edit__input"
                      />
                    </div>
                    <div className="col-4 col-md-3">
                      <button type="button" className="btn default main1 w-100">중복 확인</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주소 */}
              <div className="row mb-4">
                <div className="col-12">
                  <label className="profile-edit__label">주소 / 우편번호</label>
                  <div className="row mb-2">
                    <div className="col-8 col-md-9">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-control profile-edit__input"
                      />
                    </div>
                    <div className="col-4 col-md-3">
                      <button type="button" className="btn default main1 w-100">검색</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="text"
                        name="addressDetail"
                        value={formData.addressDetail}
                        onChange={handleInputChange}
                        placeholder="상세주소를 입력하세요"
                        className="form-control profile-edit__input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 저장 버튼 */}
              <div className="row">
                <div className="col-12 text-center">
                  <button 
                    type="button" 
                    className="btn default main1 profile-edit__submit-btn"
                    onClick={handleSubmit}
                  >
                    저장하기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>비밀번호 확인이 필요합니다.</h3>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
            />
            <div className="modal-buttons">
              <button 
                className="btn default main4"
                onClick={() => setShowPasswordModal(false)}
              >
                입력
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 모달 */}
      {showChangePasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>비밀번호 변경</h3>
            <div className="password-change-form">
              <div className="form--input">
                <label>새 비밀번호</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="8자 이상, 영문, 숫자, 특수문자 모두 포함"
                />
                <small className="error-text">비밀번호가 일치하지 않습니다.</small>
              </div>
              <div className="form--input">
                <label>새 비밀번호 확인</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호를 한 번 더 입력하세요."
                />
                <small className="error-text">비밀번호가 일치하지 않습니다.</small>
              </div>
            </div>
            <div className="modal-buttons">
              <button 
                className="btn default main4"
                onClick={handlePasswordSubmit}
              >
                입력
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditPage;
