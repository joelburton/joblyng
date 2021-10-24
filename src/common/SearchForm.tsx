import React, {useState} from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({
                      initialFilter = "",
                      setFilter,
                    }: { initialFilter?: string, setFilter: (arg0: string | undefined) => void }) {
  console.info("* SearchForm", "setFilterFor=", typeof setFilter);

  const [searchTerm, setSearchTerm] = useState(initialFilter || "");

  /** Tell parent to filter */
  function handleSubmit(evt: React.FormEvent) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    setFilter(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(evt.target.value);
  }

  return (
      <section className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="searchTerm"
              placeholder="Enter search term.."
              value={searchTerm}
              onChange={handleChange}
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Submit
          </button>
        </form>
      </section>
  );
}

export default SearchForm;
