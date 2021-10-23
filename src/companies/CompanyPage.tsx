// noinspection JSIgnoredPromiseFromCall

import {useState, useEffect} from "react";
// import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
// import JobCardList from "../jobs/JobCardList";
// import LoadingSpinner from "../common/LoadingSpinner";
import CompanyDetail from "./CompanyDetail";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import {useParams} from "react-router-dom";
import {ICompanyData} from "../interfaces";
/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyPage() {
    const { handle } = useParams<{ handle: string }>();

    const [companyResponse, setCompanyResponse] =
        useState<{company?: ICompanyData, errors?: string[]}>({});

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

    if (companyResponse.errors) return (
        <Alert messages={companyResponse.errors} />
    );

    if (!companyResponse.company) return <LoadingSpinner />;

    const {name, description, jobs} = companyResponse.company;
    return <CompanyDetail name={name} description={description} jobs={jobs!} />
}

export default CompanyPage;
