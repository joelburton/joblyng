// noinspection JSIgnoredPromiseFromCall

import {useState, useEffect} from "react";
// import { useParams } from "react-router-dom";
import JoblyApi, {CompanyData} from "../api/api";
// import JobCardList from "../jobs/JobCardList";
// import LoadingSpinner from "../common/LoadingSpinner";
import CompanyDetail from "./CompanyDetail";
import LoadingSpinner from "../common/LoadingSpinner";
/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

interface CompanyState {
    data: CompanyData | null;
    errors: string[] | null;
}

function CompanyPage() {
    // const { handle } = useParams();
    const handle = "anderson-arias-morrow";

    const [company, setCompany] = useState<CompanyState>({
        data: null,
        errors: null,
    });

    console.debug("CompanyDetail", {handle, company});

    async function fetchCompany() {
        try {
            const company = await JoblyApi.getCompany(handle);
            setCompany({data: company, errors: null});
        } catch (errs: any) {
            setCompany({data: null, errors: errs});
        }
    }

    useEffect(function fetchCompanyOnHandleChange() {
        fetchCompany();
    }, [handle]);

    // if (!company) return <LoadingSpinner />;

    if (company.errors) return (
        <div className="alert alert-danger">
            <p>{company.errors}</p>
            <button onClick={() => fetchCompany()}>Retry</button>
        </div>
    );

    if (!company.data) return <LoadingSpinner />;

    const {name, description } = company.data;
    return <CompanyDetail name={name} description={description} />
}

export default CompanyPage;
