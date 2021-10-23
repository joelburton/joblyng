import React from "react";
import JobCard from "./JobCard";
import {IJobData} from "../api/api";

/** Show list of job cards.
 *
 * Used by both JobList and CompanyDetail to list jobs. Receives an apply
 * func prop which will be called by JobCard on apply.
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 *
 */

function JobCardList({ jobs }: { jobs: IJobData[]}) {
  console.info("* JobCardList", "jobs=", jobs);

  return (
      <div className="JobCardList">
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
                companyHandle={job.companyHandle}
            />
        ))}
      </div>
  );
}

export default JobCardList;
