import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithBtn from '../../../../components/common/InputWithBtn';
import InputPhoneNumber from '../../../../components/common/InputPhoneNumber';
import InputAddress from '../../../../components/common/InputAddress';
import InputCheckPassword from '../../../../components/common/InputCheckPassword';
import InputField from '../../../../components/common/InputField';
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
    addr1: '반곡역로 116',
    addr2: '1111동 1111호'
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
    console.log('프로필 수정:', formData);
    navigate('/user/my');
  };

  const handlePasswordSubmit = () => {
    console.log('비밀번호 변경:', passwordData);
    setShowChangePasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // 중복 확인 핸들러들
  const handleNameCheck = () => {
    console.log('이름 중복 확인:', formData.name);
    // 중복 확인 로직
  };

  const handleNicknameCheck = () => {
    console.log('닉네임 중복 확인:', formData.nickname);
    // 중복 확인 로직
  };

  const handleEmailCheck = () => {
    console.log('이메일 중복 확인:', formData.email);
    // 중복 확인 로직
  };

  const handleAddressSearch = () => {
    console.log('주소 검색');
    // 주소 검색 로직
  };

  return (
    <div className="profile-edit">
      <div className='container'>
        <div className='row'>
          {/* 타이틀 */}
           <div className="profile-edit__header mt-40">
              <div className="col-12">
                <h2 className="profile-edit__title ">내 정보 수정</h2>
              </div>
        </div>

      <div className="profile-edit__content">
        <div className="row h-100">
          {/* 좌측 사이드바 */}
          <div className="col-lg-3 col-md-4 profile-edit__left">
            <div className="profile-edit__avatar-section">
              <div className="profile-edit__avatar mb-4">
                <img src="/src/assets/icons/profile.png" alt="프로필" className="img-fluid profile" />
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
                <button className="btn">회원탈퇴</button>
            </div>
          </div>

          {/* 우측 메인 영역 */}
          <div className="col-lg-9 col-md-8 profile-edit__right">
            <form className="profile-edit__form">
              {/* 이름 */}
              <InputWithBtn
                label="이름"
                type="text"
                name="name"
                value={formData.name}
                placeholder=""
                inputChange={handleInputChange}
                handleClick={handleNameCheck}
                buttonText="중복 확인"
              />

              {/* 닉네임 */}
              <InputWithBtn
                label="닉네임"
                type="text"
                name="nickname"
                value={formData.nickname}
                placeholder=""
                inputChange={handleInputChange}
                handleClick={handleNicknameCheck}
                buttonText="중복 확인"
              />

              {/* 휴대폰번호 */}
              <InputPhoneNumber
                value1={formData.phone1}
                value2={formData.phone2}
                value3={formData.phone3}
                inputChange={handleInputChange}
              />

              {/* 이메일 */}
              <InputWithBtn
                label="이메일"
                type="email"
                name="email"
                value={formData.email}
                placeholder=""
                inputChange={handleInputChange}
                handleClick={handleEmailCheck}
                buttonText="중복 확인"
              />

              {/* 주소 */}
              <InputAddress
                value1={formData.addr1}
                value2={formData.addr2}
                inputChange={handleInputChange}
              />

              {/* 저장 버튼 */}
              <button 
                type="button" 
                className="mt-40 btn default main1 profile-edit__submit-btn"
                onClick={handleSubmit}
              >
                저장하기
              </button>
            </form>
          </div>
         </div>
        </div>
        </div>
      </div>

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>비밀번호 확인이 필요합니다.</h3>
            <InputField
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              placeholder="비밀번호를 입력하세요."
              inputChange={handlePasswordChange}
            />
            <div className="modal-buttons">
              <button 
                className="btn default main1"
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
              <InputCheckPassword
                value1={passwordData.newPassword}
                value2={passwordData.confirmPassword}
                inputChange={handlePasswordChange}
              />
              <small className="error-text">비밀번호가 일치하지 않습니다.</small>
            </div>
            <div className="modal-buttons">
              <button 
                className="btn default main1"
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