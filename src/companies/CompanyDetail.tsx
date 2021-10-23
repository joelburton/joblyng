import JobCardList from "../jobs/JobCardList";
import {IJobData} from "../interfaces";

function CompanyDetail(
    {name, description, jobs} : {name: string, description: string, jobs: IJobData[] }) {
    console.log("* CompanyDetail name=", name, "description=", description);

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>{name}</h4>
            <p>{description}</p>
            <JobCardList jobs={jobs} />
        </div>
    );
}

export default CompanyDetail;