import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.scss";
import MenuBar from "../../../components/menu/MenuBar";

// 탭 컨텐츠 컴포넌트들
import PointInquiryContent from "../../../components/mypage/PointInquiryContent";
import OrderDeliveryContent from "../../../components/mypage/OrderDeliveryContent";
import DonationStatusContent from "../../../components/mypage/DonationStatusContent";
import CommunityContent from "../../../components/mypage/CommunityContent";
import InquiryContent from "../../../components/mypage/InquiryContent";
import CarbonGraphContent from "../../../components/chat/CarbonGraphContent";
import CarbonReductionCard from "../../../components/layout/CarbonReductionCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hydrateAuthThunk, logoutUserThunk } from "../../../features/authSlice";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("point-inquiry");
  const [practiceCount, setPracticeCount] = useState(15);
  const { user, hydrated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!hydrated) {
      dispatch(hydrateAuthThunk());
    }
  }, [dispatch, hydrated]);

  const handleLogOut = () => {
    const res = confirm("로그아웃하시겠습니까?");
    if (!res) {
      return;
    }
    dispatch(logoutUserThunk());
    alert("성공적으로 로그아웃했습니다.");
    dispatch(hydrateAuthThunk());
    navigate("/");
  };

  const tabs = [
    { id: "point-inquiry", label: "포인트조회" },
    { id: "order-delivery", label: "주문/배송" },
    { id: "donation-status", label: "기부 현황" },
    { id: "community", label: "커뮤니티" },
    { id: "inquiry", label: "1:1 문의" },
    { id: "carbon-graph", label: "탄소 절감 그래프" },
  ];

  // 탭별 컨텐츠 렌더링 함수
  const renderTabContent = () => {
    switch (activeTab) {
      case "point-inquiry":
        return <PointInquiryContent />;
      case "order-delivery":
        return <OrderDeliveryContent />;
      case "donation-status":
        return <DonationStatusContent />;
      case "community":
        return <CommunityContent />;
      case "inquiry":
        return <InquiryContent />;
      case "carbon-graph":
        return <CarbonGraphContent />;
      default:
        return <PointInquiryContent />;
    }
  };
  // console.log("현재 user 상태:", user, typeof user, Object.keys(user || {}));
  if (user === null) {
    return <LoadingPage />;
  }

  return (
    <div className="mypage">
      <MenuBar />
      <div className="container">
        <div className="row">
          {/* 사이드바 */}
          <aside className="col-lg-3 col-md-4 mypage__sidebar">
            <div className="row mypage__sidebar__card__list">
              {/* 홈 버튼 */}
              <div className="mypage__home-button mb-3">
                <button
                  className="mypage__home-btn"
                  onClick={() => navigate("/user")}
                  title="메인페이지로 이동"
                >
                  RE:EARTH
                </button>
              </div>

              <div className="mypage__profile__card mb-3">
                <div className="card-body">
                  <div className="h-100 d-flex flex-column align-items-center">
                    <div className="mypage__avatar mr-3">
                      <img
                        src="/src/assets/icons/profile.png"
                        alt="프로필"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="mypage__user-info">
                      <span className="mypage__username">{user?.name}</span>
                      <button
                        className="mypage__edit-profile"
                        onClick={() =>
                          navigate("/user/my/edit", {
                            state: { user },
                          })
                        }
                      >
                        프로필수정
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mypage__sprout mypage__card mb-3">
                <div className="card-body">
                  <h6 className="card-title">새싹</h6>
                  <div className="progress mt-10">
                    <div
                      className="mypage__progress-fill"
                      role="progressbar"
                    ></div>
                  </div>
                  <span className="mt-10">나무가 되기까지 nnn점</span>
                </div>
              </div>

              <div className="mypage__practice-count mypage__card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>환경보호 실천 건수</span>
                    {/* 숫자 데이터 가져오기 */}
                    <span className="mypage__count-number">
                      {practiceCount}
                    </span>
                    <img src="/src/assets/icons/right-line.svg" alt="화살표" />
                  </div>
                </div>
              </div>

              <div className="mypage__point-balance mypage__side__card mb-3 ">
                <div className="card-body d-flex align-items-center flex-column">
                  <h4 className="card-title">포인트 잔액</h4>
                  <p className="mypage__point-amount h3 text-primary">
                    1,274 P
                  </p>
                  <button className="d-flex btn-point">
                    포인트 모으러 가기
                    <img
                      src="/src/assets/icons/right-line.svg"
                      alt="화살표"
                      className="ml-2"
                    />
                  </button>
                </div>
              </div>

              <CarbonReductionCard
                className="mypage__card mb-3"
                treeCount={3}
                totalTrees={10}
              />

              <div className="mypage__bottom-links">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <a href="#" className="mypage__link">
                      보안 설정
                    </a>
                    <p className="btn" onClick={handleLogOut}>
                      로그아웃
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* 메인 컨텐츠 */}
          <main className="col-lg-9 col-md-8 mypage__main">
            {/* 탭 네비게이션 */}
            <nav className="mypage__tabs">
              <ul className="nav nav-tabs">
                {tabs.map((tab) => (
                  <li key={tab.id} className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 탭 컨텐츠 */}
            <div className="mypage__content tab-content">
              <div className="tab-pane active">{renderTabContent()}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
