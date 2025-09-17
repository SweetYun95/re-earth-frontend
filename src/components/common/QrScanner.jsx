import { useRef, useState } from 'react'

function QrScanner({ label }) {
   const videoRef = useRef(null)
   const [isActive, setIsActive] = useState(false)

   const handleStartCamera = async () => {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }, // 후면 카메라 우선 (모바일용)
         })
         if (videoRef.current) {
            videoRef.current.srcObject = stream
            setIsActive(true)
         }
      } catch (err) {
         console.error('카메라 접근 실패:', err)
         alert('카메라 권한을 허용해 주세요!')
      }
   }

   return (
      <div>
         <button className="btn main1 default" onClick={handleStartCamera}>
            {label}
         </button>

         {isActive && <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '400px' }} />}
      </div>
   )
}

export default QrScanner
