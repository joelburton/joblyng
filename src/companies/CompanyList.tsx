import CompanyCard from "./CompanyCard";
import React from "react";
import {ICompanyData} from "../interfaces";

function CompanyList({companies}: { companies: ICompanyData[] }) {
  console.info("* CompanyList companies=", companies);
  return (
      <section className="CompanyList">
        {companies.map(c => (
            <CompanyCard
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
                numEmployees={c.numEmployees}
            />
        ))}
      </section>

  );
}

export default React.memo(CompanyList);