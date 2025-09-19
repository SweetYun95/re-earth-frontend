// re-earth-frontend/src/pages/user/main/sections/StatsAndMapSection.jsx
import React, { useState } from "react";
import MapComponent from "../../../../components/map/MapComponent";
import "../mainpage.scss";
import ArrowIcon from "../../../../components/common/ArrowIcon";
import CarbonReductionCard from "../../../../components/layout/CarbonReductionCard";

const COMMUNITY = [
  "제인도가 방금 5kg의 옷을 기부했습니다.",
  "이번 주말에 해변 청소 이벤트가 열립니다!",
  "제인도가 방금 5kg의 옷을 기부했습니다.",
  "000님 nnnnn P 달성!",
];

export default function StatsAndMapSection() {
  const [position, setPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  return (
    <section id="stats" className="main--stats section">
      <div className="container">
        <div className="row">
          {/* Left: stats(3) + community - 2열 2행 그리드 */}
          <div className="col-md-6">
            <div className="row">
              {/* 오늘의 미션 */}
              <div className="col-md-6 mb-3">
                <div className="custom-card border-0 custom-card-green-bg">
                  <div className="text-white text-center custom-custom-card-content">
                    <h5 className="custom-card-title font-weight-bold mb-2">
                      오늘의 미션
                    </h5>
                    <p className="custom-custom-card-text mb-3">
                      일회용 컵 대신 텀블러를 사용하세요!
                      <br />
                      달성시 <span className="text-warning">nn P</span> 적립
                    </p>
                    <button className="btn-point">미션 시작하기 →</button>
                  </div>
                </div>
              </div>

              {/* 내 탄소 포인트 */}
              <div className="col-md-6 mb-3">
                <div className="custom-card">
                  <div className="text-center custom-custom-card-content">
                    <h5 className="custom-card-title font-weight-bold mb-2 text-green">
                      내 탄소 포인트
                    </h5>
                    <p className="custom-custom-card-text small text-muted mb-2">
                      포인트 분석한마디
                    </p>
                    <p className="text-muted mb-1">Total</p>
                    <h3 className="font-weight-bold text-green">nn,nnn P</h3>
                  </div>
                </div>
              </div>

              {/* 이달 탄소 절감량 */}
              <div className="col-md-6 mb-3">
                <div className="custom-card">
                  <div className="text-center custom-custom-card-content">
                    <CarbonReductionCard
                      className="carbon-reduction-card--centered"
                      treeCount={3}
                      totalTrees={10}
                    />
                  </div>
                </div>
              </div>

              {/* 커뮤니티 */}
              <div className="col-md-6 mb-3">
                <div className="community-custom-card custom-card-yellow-bg">
                  <div className="community-title d-flex align-items-center justify-content-between">
                    <h5 className="custom-card-title font-weight-bold m-0">
                      Community
                    </h5>
                    {/* 커뮤니티페이지이동 */}
                    <a href="#">
                      <ArrowIcon variant="section" size={32} />
                    </a>
                  </div>
                  <div className="community-feed">
                    {COMMUNITY.map((item, index) => (
                      <div
                        key={index}
                        className="small text-muted text-ellipsis-1"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map - 꽉차게 */}
          <div className="col-md-6 mb-3">
            <div className="custom-card h-100 border map-custom-card-green-bg">
              <div className="custom-card-body map-custom-card-content">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="custom-card-title font-weight-bold mb-0 mr-2">
                    내 주변 수거함
                  </h5>
                  <a href="#">
                    <ArrowIcon variant="section" size={32} />
                  </a>
                </div>
                <p className="text-muted mb-3">
                  간편하게 내 주변 수거함을 찾아보세요
                </p>
                <MapComponent position={position} setPosition={setPosition} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
