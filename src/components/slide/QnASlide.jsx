import React from 'react'

export default function QnASlide({
  img, imgAlt,
  qEyebrow, qTitle, qDesc,
  sEyebrow, sTitle, sCTAstrong, sCTAspan
}) {
  return (
    <div className="blog-slider__wrp">
      <article className="q-card">
        <div className="q-card__media">
          <img src={img} alt={imgAlt} />
        </div>
        <div className="q-card__body">
          <span className="eyebrow">{qEyebrow}</span>
          <h3 className="q-title">{qTitle}</h3>
          <p className="q-desc">{qDesc}</p>
        </div>
      </article>

      <aside className="s-card">
        <span className="s-eyebrow">{sEyebrow}</span>
        <h4 className="s-title">{sTitle}</h4>
        <div className="s-visual" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.807 2C16.208 2 19.758 4.335 21 8" />
              <path d="m7 17l-4-1l-1 4M17 7l4 1l1-4" />
            </g>
          </svg>
        </div>
        <p className="s-cta">
          <strong>{sCTAstrong}</strong>
          <span>{sCTAspan}</span>
        </p>
      </aside>
    </div>
  )
}
