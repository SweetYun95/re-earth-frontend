import { useNavigate, Link } from 'react-router-dom'

export default function LoginCTASection() {
  const navigate = useNavigate()

  return (
    <section className="panel panel--login-cta">
      <h2>지금 시작해요</h2>

      {/* 방법 A: 버튼 onClick 으로 이동 */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate('/login', { replace: false, state: { from: 'landing-cta' } })}
      >
        로그인
      </button>
    </section>
  )
}
