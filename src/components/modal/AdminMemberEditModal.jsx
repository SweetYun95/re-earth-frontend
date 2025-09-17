import React, { useState, useEffect } from 'react';
import AdminBaseModal from './AdminBaseModal';
import InputWithBtn from '../common/InputWithBtn';
import InputPhoneNumber from '../common/InputPhoneNumber';
import InputAddress from '../common/InputAddress';
import InputField from '../common/InputField';

const AdminMemberEditModal = ({ isOpen, onClose, member, onSave }) => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    addr1: '',
    addr2: '',
    status: '활성',
    points: '0'
  });

  useEffect(() => {
    if (member) {
      setFormData({
        userId: member['회원ID'] || '',
        name: member['이름'] || '',
        email: member['이메일'] || '',
        phone1: '010',
        phone2: '1234',
        phone3: '5678',
        addr1: '인천광역시 남동구 00로 00-00',
        addr2: '',
        status: member['상태'] || '활성',
        points: member['포인트'] || '0'
      });
    } else {
      // 새 회원 추가 시 초기값
      setFormData({
        userId: '',
        name: '',
        email: '',
        phone1: '010',
        phone2: '',
        phone3: '',
        addr1: '',
        addr2: '',
        status: '활성',
        points: '0'
      });
    }
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const handleCheckDuplicate = (field) => {
    console.log(`${field} 중복 확인:`, formData[field]);
    // 중복 확인 로직
  };

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={member ? '회원 정보 수정' : '새 회원 추가'}
      size="md"
    >
      <form className="member-edit-form">
        {/* 회원ID */}
        <InputWithBtn
          label="회원ID"
          type="text"
          name="userId"
          value={formData.userId}
          placeholder="회원ID를 입력하세요"
          inputChange={handleInputChange}
          handleClick={() => handleCheckDuplicate('userId')}
          buttonText="중복 확인"
          disabled={!!member} // 수정 시에는 ID 변경 불가
        />

        {/* 이름 */}
        <InputField
          label="이름"
          type="text"
          name="name"
          value={formData.name}
          placeholder="이름을 입력하세요"
          inputChange={handleInputChange}
          required
        />

        {/* 이메일 */}
        <InputWithBtn
          label="이메일"
          type="email"
          name="email"
          value={formData.email}
          placeholder="이메일을 입력하세요"
          inputChange={handleInputChange}
          handleClick={() => handleCheckDuplicate('email')}
          buttonText="중복 확인"
        />

        {/* 휴대폰번호 */}
        <InputPhoneNumber
          value1={formData.phone1}
          value2={formData.phone2}
          value3={formData.phone3}
          inputChange={handleInputChange}
        />

        {/* 주소 */}
        <InputAddress
          value1={formData.addr1}
          value2={formData.addr2}
          inputChange={handleInputChange}
        />

        {/* 상태 */}
        <div className="form--input">
          <p>계정 상태</p>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="활성">활성</option>
            <option value="비활성">비활성</option>
            <option value="정지">정지</option>
          </select>
        </div>

        {/* 포인트 (관리자만 수정 가능) */}
        <InputField
          label="포인트"
          type="text"
          name="points"
          value={formData.points}
          placeholder="포인트를 입력하세요"
          inputChange={handleInputChange}
        />

        {/* 액션 버튼들 */}
        <div className="member-edit-form__actions">
          <button 
            type="button"
            className="btn default main2"
            onClick={onClose}
          >
            취소
          </button>
          <button 
            type="button"
            className="btn default main1"
            onClick={handleSubmit}
          >
            {member ? '수정' : '추가'}
          </button>
        </div>
      </form>
    </AdminBaseModal>
  );
};

export default AdminMemberEditModal;
