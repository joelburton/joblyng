import {CompanyData} from "./api/api";

interface CompanyState {
    data: CompanyData | null;
    errors: Error[] | null;
}
