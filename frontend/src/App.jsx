import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Job from './components/Job'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Terms from './components/auth/Terms'
import Privacy from './components/auth/Privacy'
import JobDescription from './components/JobDescription'
import Companies from './components/Companies'
import CompanyCreate from './components/CompanyCreate'
import Companydetails from './components/Companydetails'
import AdminJobs from './components/AdminJobs'
import AdminJobCreate from './components/AdminJobCreate'
import AdminDescription from './components/AdminDescription'
import Applicants from './components/Applicants'
import Protected from './components/Protectedroute'
import Protectedauth from './components/Protectedauth'

const approuter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  
  {
    path: '/login',
    element:<Protectedauth> <Login /></Protectedauth>,
  },
  {
    path: '/signup',
    element: <Protectedauth><Signup /></Protectedauth>,
  },
  {
    path: '/jobs',
    element: <Job />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/terms',
    element: <Terms/>,
  },
  {
    path: '/privacy',
    element: <Privacy/>,
  },
  {
    path: '/description/:id',
    element: <JobDescription/>,
  },
  {
    path: '/admin/companies',
    element: <Protected><Companies/></Protected>,
  },
  {
    path: '/admin/companies/create',
    element: <Protected><CompanyCreate/></Protected>,
  },
  {
    path: '/admin/companies/:id',
    element: <Protected><Companydetails/></Protected>,
  },
  {
    path: '/admin/jobs',
    element: <Protected><AdminJobs/></Protected>,
  },
  {
    path: '/admin/job/create',
    element: <Protected><AdminJobCreate/></Protected>,
  },
  {
    path: '/description/:id/admin',
    element: <Protected><AdminDescription/></Protected>
  },
  {
    path: '/description/:id/admin/applicant',
    element: <Protected><Applicants/></Protected>
  },
]);
function App() {
  

  return (
    <>
      
      <RouterProvider router={approuter}/>
    </>
  )
}

export default App
