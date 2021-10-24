import React, {useState, useEffect} from "react";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import {ICompanyData} from "../interfaces";
import CompanyList from "./CompanyList";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */


function CompanyListPage() {

  const [companiesResponse, setCompaniesResponse] =
      useState<{ companies?: ICompanyData[], errors?: string[] }>({});
  const [filter, setFilter] = useState<string>();
  const {companies, errors} = companiesResponse;

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

  if (errors) return <Alert messages={errors} />;
  if (!companies) return <LoadingSpinner />;

  return (
      <main className="CompanyListPage col-md-8 offset-md-2">
        <SearchForm initialFilter={filter} setFilter={setFilter} />
        {companies.length
            ? <CompanyList companies={companies} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </main>
  );
}

export default CompanyListPage;
