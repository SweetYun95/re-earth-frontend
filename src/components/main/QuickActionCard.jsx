import React, { useId, useRef, useLayoutEffect, useState } from "react";

/**
 * corner: 'br' | 'tr' | 'bl' | 'tl'
 * notch: { w: px, h: px, r: px, overlap: px }  // px 단위 숫자
 */
export default function QuickActionCard({
  corner = "br",
  notch = { w: 56, h: 36, r: 14, overlap: 10 },
  className = "",
  children,
}) {
  const maskId = useId();
  const svgRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // 카드 크기 변화에 맞춰 notch 위치 재계산
  useLayoutEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { inlineSize: w, blockSize: h } = entry.contentBoxSize
        ? entry.contentBoxSize[0]
        : { inlineSize: el.clientWidth, blockSize: el.clientHeight };
      setBox({ w: el.clientWidth || w, h: el.clientHeight || h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w: cardW, h: cardH } = box;
  const { w, h, r, overlap } = notch;

  // notch 위치 계산 (px)
  let notchX = 0, notchY = 0;
  if (corner === "br") {
    notchX = Math.max(cardW - w - overlap, -overlap);
    notchY = Math.max(cardH - h - overlap, -overlap);
  } else if (corner === "tr") {
    notchX = Math.max(cardW - w - overlap, -overlap);
    notchY = -overlap;
  } else if (corner === "bl") {
    notchX = -overlap;
    notchY = Math.max(cardH - h - overlap, -overlap);
  } else if (corner === "tl") {
    notchX = -overlap;
    notchY = -overlap;
  }

  return (
    <div className={`card h-100 border-0 quick-action-card ${className}`}>
      {/* SVG 마스크: userSpaceOnUse 로 px 좌표 사용 */}
      <svg
        ref={svgRef}
        className="qa-mask"
        viewBox={`0 0 ${Math.max(cardW, 1)} ${Math.max(cardH, 1)}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {/* 흰색 = 보임 */}
            <rect x="0" y="0" width={cardW} height={cardH} fill="white" />
            {/* 검정 = 구멍(투명)  👉 모서리 '사각형(둥근 모서리)' */}
            <rect
              x={notchX}
              y={notchY}
              width={w}
              height={h}
              rx={r}
              ry={r}
              fill="black"
            />
          </mask>
        </defs>

        {/* 카드 배경(모서리 둥글게) + 그림자 */}
        <rect
          className="qa-bg"
          x="0"
          y="0"
          width={cardW || 1}
          height={cardH || 1}
          rx="16"
          ry="16"
          mask={`url(#${maskId})`}
        />
      </svg>

      <div className="card-body">{children}</div>
    </div>
  );
}
