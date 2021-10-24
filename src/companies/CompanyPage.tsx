// noinspection JSIgnoredPromiseFromCall

import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ICompanyDataFull} from "../interfaces";
import JoblyApi from "../api/api";
import CompanyDetail from "./CompanyDetail";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyPage() {
  const {handle} = useParams<{ handle: string }>();

  const [companyResponse, setCompanyResponse] =
      useState<{ company?: ICompanyDataFull, errors?: string[] }>({});
  const {company, errors} = companyResponse;

  console.info("* CompanyPage", "handle=", handle, "companyResponse=", companyResponse);

  useEffect(function fetchCompanyOnHandleChange() {
    console.info("& CompanyPage.fetchCompanyOnHandleChange handle=", handle);

    async function fetchCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompanyResponse({company});
      } catch (errors: any) {
        setCompanyResponse({errors});
      }
    }

    fetchCompany();
  }, [handle]);

  if (errors) return <Alert messages={errors} />;
  if (!company) return <LoadingSpinner />;

  const {name, description, jobs} = company;
  return <CompanyDetail name={name} description={description} jobs={jobs} />;
}

export default CompanyPage;
