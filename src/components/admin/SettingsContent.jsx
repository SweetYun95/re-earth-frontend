import React, { useState } from 'react'
import InputField from '../common/InputField'
import InputCheckPassword from '../common/InputCheckPassword'

const SettingsContent = () => {
   const [systemSettings, setSystemSettings] = useState({
      siteName: 'Re:earth',
      siteDescription: '환경보호를 위한 기부 플랫폼',
      pointRate: '100',
      maxFileSize: '10',
      maintenanceMode: false,
      emailNotification: true,
      smsNotification: false,
   })

   const [adminPassword, setAdminPassword] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
   })

   const handleSystemSettingChange = (e) => {
      const { name, value, type, checked } = e.target
      setSystemSettings((prev) => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value,
      }))
   }

   const handlePasswordChange = (e) => {
      const { name, value } = e.target
      setAdminPassword((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const handleSystemSave = () => {
      console.log('시스템 설정 저장:', systemSettings)
      alert('시스템 설정이 저장되었습니다.')
   }

   const handlePasswordSave = () => {
      if (adminPassword.newPassword !== adminPassword.confirmPassword) {
         alert('새 비밀번호가 일치하지 않습니다.')
         return
      }
      console.log('비밀번호 변경:', adminPassword)
      alert('비밀번호가 변경되었습니다.')
      setAdminPassword({ currentPassword: '', newPassword: '', confirmPassword: '' })
   }

   return (
      <div className="settings-content">
         <h2 className="settings-content__title mb-4">시스템 설정</h2>

         <div className="row">
            {/* 시스템 설정 */}
            <div className="col-md-6">
               <div className="settings-section">
                  <h4 className="settings-section__title">기본 설정</h4>

                  <InputField label="사이트 이름" type="text" name="siteName" value={systemSettings.siteName} placeholder="사이트 이름을 입력하세요" inputChange={handleSystemSettingChange} />

                  <div className="form--input">
                     <p>사이트 설명</p>
                     <textarea name="siteDescription" value={systemSettings.siteDescription} onChange={handleSystemSettingChange} placeholder="사이트 설명을 입력하세요" rows="3" className="form-control" />
                  </div>

                  <InputField label="포인트 적립률 (기부 1kg당)" type="number" name="pointRate" value={systemSettings.pointRate} placeholder="포인트 적립률" inputChange={handleSystemSettingChange} />

                  <InputField label="최대 파일 크기 (MB)" type="number" name="maxFileSize" value={systemSettings.maxFileSize} placeholder="최대 파일 크기" inputChange={handleSystemSettingChange} />

                  {/* 체크박스 옵션들 */}
                  <div className="settings-checkboxes">
                     <div className="form-check">
                        <input type="checkbox" id="maintenanceMode" name="maintenanceMode" checked={systemSettings.maintenanceMode} onChange={handleSystemSettingChange} className="form-check-input" />
                        <label htmlFor="maintenanceMode" className="form-check-label">
                           점검 모드 활성화
                        </label>
                     </div>

                     <div className="form-check">
                        <input type="checkbox" id="emailNotification" name="emailNotification" checked={systemSettings.emailNotification} onChange={handleSystemSettingChange} className="form-check-input" />
                        <label htmlFor="emailNotification" className="form-check-label">
                           이메일 알림 활성화
                        </label>
                     </div>

                     <div className="form-check">
                        <input type="checkbox" id="smsNotification" name="smsNotification" checked={systemSettings.smsNotification} onChange={handleSystemSettingChange} className="form-check-input" />
                        <label htmlFor="smsNotification" className="form-check-label">
                           SMS 알림 활성화
                        </label>
                     </div>
                  </div>

                  <button className="btn default main1 mt-3" onClick={handleSystemSave}>
                     설정 저장
                  </button>
               </div>
            </div>

            {/* 관리자 계정 설정 */}
            <div className="col-md-6">
               <div className="settings-section">
                  <h4 className="settings-section__title">관리자 계정</h4>

                  <InputField label="현재 비밀번호" type="password" name="currentPassword" value={adminPassword.currentPassword} placeholder="현재 비밀번호를 입력하세요" inputChange={handlePasswordChange} />

                  <InputCheckPassword value1={adminPassword.newPassword} value2={adminPassword.confirmPassword} inputChange={handlePasswordChange} />

                  <button className="btn default main1 mt-3" onClick={handlePasswordSave}>
                     비밀번호 변경
                  </button>
               </div>

               {/* 시스템 정보 */}
               <div className="settings-section mt-4">
                  <h4 className="settings-section__title">시스템 정보</h4>
                  <div className="settings-info">
                     <div className="settings-info__item">
                        <span className="settings-info__label">버전</span>
                        <span className="settings-info__value">v1.0.0</span>
                     </div>
                     <div className="settings-info__item">
                        <span className="settings-info__label">마지막 업데이트</span>
                        <span className="settings-info__value">2025-01-15</span>
                     </div>
                     <div className="settings-info__item">
                        <span className="settings-info__label">서버 상태</span>
                        <span className="settings-info__value text-success">정상</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SettingsContent
