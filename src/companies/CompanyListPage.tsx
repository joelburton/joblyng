import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi, {CompanyData} from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

interface CompaniesState {
    data: CompanyData[] | null;
    errors: string[] | null;
}

function CompanyList() {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState<CompaniesState>(
        {data: null, errors: null}
    );

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        fetchCompanies();
    }, []);

    /** Triggered by search form submit; reloads companies. */
    async function fetchCompanies(name?: string) {
        try {
            let companies = await JoblyApi.getCompanies(name);
            setCompanies({data: companies, errors: null});
        } catch (errs: any) {
            setCompanies({data: null, errors: errs});
        }
    }

    if (companies.errors) return (
        <div className="alert alert-danger">
            <p>{companies.errors}</p>
            <button onClick={() => fetchCompanies()}>Retry</button>
        </div>
    );

    if (!companies.data) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={fetchCompanies} />
            {companies.data.length
                ? (
                    <div className="CompanyList-list">
                        {companies.data.map(c => (
                            <CompanyCard
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                                numEmployees={c.numEmployees}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default CompanyList;
