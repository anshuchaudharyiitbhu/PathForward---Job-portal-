import React from 'react'
import { UserProvider } from './context/context'
import {  JobProvider } from './context/Jobcontext'
import {  CompanyProvider } from './context/companycontext'
import { AdminJobProvider } from './context/Adminjobcontext'
import { SearchedProvider } from './context/searchedcontext'
import { FilterProvider } from './context/filtercontent'

const Provider = ({children}) => {
  return (
    <FilterProvider>
    <SearchedProvider>
    <AdminJobProvider>
          <CompanyProvider>
    <JobProvider>
        <UserProvider>
      {children}
      </UserProvider>
       </JobProvider> 
       </CompanyProvider>
       </AdminJobProvider>
       </SearchedProvider>
       </FilterProvider>

    
  )
}

export default Provider
