import React from "react";

function CompanyDetail(
    {name, description} : {name: string, description: string }) {

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>{name}</h4>
            <p>{description}</p>
            {/*<JobCardList jobs={company.jobs} />*/}
        </div>
    );
}

export default CompanyDetail;