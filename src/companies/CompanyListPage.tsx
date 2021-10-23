import React, {useState, useEffect} from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import {ICompanyData} from "../interfaces";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */


function CompanyList() {

    const [companiesResponse, setCompaniesResponse] =
        useState<{ companies?: ICompanyData[], errors?: string[] }>({});
    const [filter, setFilter] = useState<string>();

    console.info("* CompanyListPage", "companiesResponse=", companiesResponse, "filter=", filter);

    /** Triggered by search form submit; reloads companies. */

    // handled differently than jobs --- which is better?
    // this is "state-based", and gives two renders --- filter changed, then list changed
    useEffect(function fetchCompaniesOnFilterChange() {
        console.info("& CompanyListPage.fetchCompaniesOnMount");
        async function fetchCompanies() {
            console.info("> CompanyListPage.fetchCompanies");
            try {
                let companies = await JoblyApi.getCompanies(filter);
                setCompaniesResponse({companies});
            } catch (errors: any) {
                setCompaniesResponse({errors});
            }
        }
        // noinspection JSIgnoredPromiseFromCall
        fetchCompanies();
    }, [filter]);

    if (companiesResponse.errors) return <Alert messages={companiesResponse.errors} />

    if (!companiesResponse.companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm initialFilter={filter} setFilter={setFilter} />
            {companiesResponse.companies.length
                ? (
                    <div className="CompanyList-list">
                        {companiesResponse.companies.map(c => (
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
