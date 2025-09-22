import React, { useState } from 'react'
import { useSession } from '@clerk/clerk-react'
import { useEffect } from 'react'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import { getJobs } from '@/api/apijobs'
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/job-card'
import { getCompanies } from '@/api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectItem, SelectGroup, SelectTrigger, SelectValue, SelectContent, SelectLabel } from "@/components/ui/select"
import { State } from 'country-state-city'



const JobListing = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();


  const clearFilters=()=>{
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  }

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,

  } = useFetch(getJobs, {
    location, company_id, searchQuery
  });


  const {
    fn: fnCompanies,
    data: companies,


  } = useFetch(getCompanies,);

  useEffect(() => {
    if (isLoaded)
      fnCompanies();
  }, [isLoaded, location, company_id, searchQuery]
  )


  useEffect(() => {
    if (isLoaded)
      fnJobs();
  }, [isLoaded, location, company_id, searchQuery]
  )

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return <div> <h1 className='bg-gradient-to-br from-gray-500 via-gray-200
   to-white text-transparent bg-clip-text font-extrabold text-6xl sm:text-7xl text-center pb-8'>
    Latest Jobs</h1>

    <form onSubmit={handleSearch} className="h-14 flex flex-row w-full gap-2 items-center mb-3">
      <Input type="text" placeholder="Search Jobs by Title.." name="search-query"
        className="h-full flex-1 px-4 text-md" />
      <Button type="submit" className="h-full sm:w-28" variant="blue"> Search</Button>


    </form>
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <Select value={location} onValueChange={(value) => setLocation(value)}>
        <SelectTrigger className="w-full sm:flex-1 h-10">
          <SelectValue placeholder="Filter by Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>States</SelectLabel>
            {State.getStatesOfCountry("IN").map(({ name }) => {
              return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
        <SelectTrigger className="w-full sm:flex-1 h-10">
          <SelectValue placeholder="Filter by Company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Companies</SelectLabel>
            {companies?.map(({ name, id }) => {
              return (
                <SelectItem key={name} value={id}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        className="w-full sm:w-auto sm:px-6 h-10"
        variant="destructive"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>


    {loadingJobs && (
      <BarLoader className='mt-4' width={"100%"} color='#36d7b7' />
    )}

    {loadingJobs === false && (
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {jobs?.length ? (
          jobs.map((job) => {
            return <JobCard key={job.id} job={job}
              savedInit={job.saved?.length > 0}
            />
          })
        ) : (
          <div>No Jobs Found 😥</div>
        )}
      </div>
    )}

  </div>
}



export default JobListing
