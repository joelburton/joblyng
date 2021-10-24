import React, {useContext} from "react";
import {IJobData} from "../interfaces";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard(
    {id, title, salary, equity, companyName}: IJobData) {
  console.info("* JobCard");

  const {hasAppliedToJob, applyToJob} = useContext(UserContext);
  const applied = hasAppliedToJob!(id);

  /** Apply for a job */
  async function handleApply() {
    applyToJob!(id);
  }

  return (
      <div className="JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary &&
          <div><small>Salary: ${salary.toLocaleString()}</small></div>}
          {equity !== null &&
          <div><small>Equity: {(equity * 100).toFixed(2)}%</small></div>}
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
  );
}


export default JobCard;
