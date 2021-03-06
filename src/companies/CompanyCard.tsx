import React from "react";
import {Link} from "react-router-dom";

import "./CompanyCard.css";
import {ICompanyData} from "../interfaces";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard(
    {name, description, logoUrl, handle, numEmployees}: ICompanyData,
) {
  console.info("* CompanyCard");

  return (
      <Link className="CompanyCard card" to={`/companies/${handle}`}>
        <div className="card-body">
          <h6 className="card-title">
            {name}
            {logoUrl &&
            <img src={logoUrl} alt={name} className="float-right mb-5" />
            }
          </h6>
          <p><small>{description}</small></p>
          <p>Num employees: {numEmployees}</p>
        </div>
      </Link>
  );
}

export default CompanyCard;
