import React, {useState, useEffect} from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi, {ICompanyData} from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";

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

    console.info("* CompanyListPage", "companiesResponse=", companiesResponse);

    /** Triggered by search form submit; reloads companies. */
    async function fetchCompanies(name?: string) {
        console.info("> CompanyListPage.fetchCompanies");
        try {
            let companies = await JoblyApi.getCompanies(name);
            setCompaniesResponse({companies});
        } catch (errors: any) {
            setCompaniesResponse({errors});
        }
    }

    useEffect(function fetchCompaniesOnMount() {
        console.info("& CompanyListPage.fetchCompaniesOnMount");
        // noinspection JSIgnoredPromiseFromCall
        fetchCompanies();
    }, []);


    if (companiesResponse.errors) return <Alert messages={companiesResponse.errors} />

    if (!companiesResponse.companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={fetchCompanies} />
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
