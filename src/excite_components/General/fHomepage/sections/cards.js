import React from "react";

export default function HomeCard() {
  return (
    <div>
      <ul class="tiles">
        <li class="tiles-list">
          <div class="tiles-upper-content">
            <img
              className="page-img"
              src="https://image.freepik.com/free-vector/office-workers-analyzing-researching-business-data_74855-4445.jpg"
            />
            <h3>Start Selling Products</h3>
            <p>
              Take advantage of the Excite platform to for your products and
              services right to your buyers
            </p>
          </div>
          <div class="tiles-upper-lower">
            <p>Learn more</p>
          </div>
        </li>
        <li class="tiles-list">
          <div class="tiles-upper-content">
            <img
              className="page-img"
              src="https://image.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
            />
            <h3>Boost your buiness </h3>
            <p>
              Leverage the influencer Marketing on the Excite platform to boost
              your products and services
            </p>
          </div>
          <div class="tiles-upper-lower">
            <p>Learn more </p>
          </div>
        </li>

        <li class="tiles-list">
          <div class="tiles-upper-content">
            <img
              src="https://image.freepik.com/free-vector/couple-professionals-analyzing-graphs_74855-4393.jpg"
              className="page-img"
            />

            <h3>Enterprise Solutions</h3>
            <p>
              Register your business access loans to start-up your business.
            </p>
          </div>
          <div class="tiles-upper-lower">
            <p>Learn more</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
