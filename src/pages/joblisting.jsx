import React, { useState } from 'react'
import { useSession } from '@clerk/clerk-react'
import { useEffect } from 'react'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import { getJobs } from '@/api/apijobs'
import { BarLoader } from 'react-spinners'



const JobListing = () => {

  const[ searchQuery,setSearchQuery]=useState("");
    const [location,setLocation]=useState("");
     const [company_id,setCompany_id]=useState("");
     const {isLoaded}= useUser();


  const {
    fn:fnJobs,
    data:dataJobs,
    loading:loadingJobs,

  }=useFetch(getJobs,{
    location,company_id,searchQuery
  });


useEffect(()=>{
  if(isLoaded)
  fnJobs();
},[isLoaded,location,company_id,searchQuery]
)

if(!isLoaded){
  return <BarLoader classname="mb-4" width={"100%"}color ="#36d7b7"/>;
 }

return <div> <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h1></div>
}


   
export default JobListing
