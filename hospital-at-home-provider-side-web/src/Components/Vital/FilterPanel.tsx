import {applyFilters, handleFilterChange} from "../../BackendFunctionCall/Vital/filterPanel";
import React, {SetStateAction} from "react";
import {setPriority} from "os";
import {Patient} from "./PatientVitalInterface";

export default function FilterPanel({filters, setFilters, setPatients}:
{
  filters: { providerID: string, firstName: string, lastName: string, gender: string }
  setFilters: React.Dispatch<SetStateAction<{ providerID: string, firstName: string, lastName: string, gender: string }>>
  setPatients: React.Dispatch<SetStateAction<Patient[]>>
}) {
  return (<div className="filterPanel">
    <input
      className="input"
      onChange={(e) => handleFilterChange('providerID', e.target.value, setFilters)}
      value={filters.providerID}
      placeholder="Provider ID"
    />
    <input
      className="input"
      onChange={(e) => handleFilterChange('firstName', e.target.value, setFilters)}
      value={filters.firstName}
      placeholder="First Name"
    />
    <input
      className="input"
      onChange={(e) => handleFilterChange('lastName', e.target.value, setFilters)}
      value={filters.lastName}
      placeholder="Last Name"
    />
    <input
      className="input"
      onChange={(e) => handleFilterChange('gender', e.target.value, setFilters)}
      value={filters.gender}
      placeholder="Gender"
    />
    <button onClick={() => {applyFilters(filters, setPatients)}}>Apply Filters</button>
  </div>)
}
