import React from 'react';
import SolutionSlider from '../../../../components/randing/SolutionSlider';

export default function SolutionInActionSection() {
  return (
    <section className="panel contents--cards">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <div className="randing--section__title mt-40">
              <p>지구의 아픔을 들여다보아요</p>
              <h2>Solution in Action</h2>
            </div>
          </div>

          <div className="col-12 col-md-10 mt-40">
            <SolutionSlider />
          </div>
        </div>
      </div>
    </section>
  );
}