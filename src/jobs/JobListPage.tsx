import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import {IJobData} from "../interfaces";

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed to at /jobs
 */

function JobListPage() {

  const [jobsResponse, setJobsResponse] = useState<{jobs?: IJobData[], errors?: string[]}>({});
  console.info("* JobList jobsResponse=", jobsResponse);

  useEffect(function getAllJobsOnMount() {
    console.info("JobList.useEffect getAllJobsOnMount");
    // noinspection JSIgnoredPromiseFromCall
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(title?: string) {
    let jobs = await JoblyApi.getJobs(title);
    setJobsResponse({jobs});
  }

  if (!jobsResponse.jobs) return <LoadingSpinner />;

  return (
      <div className="JobList col-md-8 offset-md-2">
        <Search searchFor={search} />
        {jobsResponse.jobs!.length > 0
            ? <JobCardList jobs={jobsResponse.jobs!} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default JobListPage;
