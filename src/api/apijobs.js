import supabaseClient from "@/utils/superbase";


export async function getJobs(token,{location,company_id,searchQuery}) {
    const superbase= await supabaseClient(token);

    let query=supabaseClient.from("jobs").select("*");

    if(location){
        query=query.eq("location",location);
    }
    if(company_id){
        query=query.eq("company_id",company_id)
    }
    if(searchQuery){
        query=query.ilike("title",`%${searchQuery}%`)
    }









    const {data,error}=await query;
    if(error){
        console.error("Error fetching jobs:",error);
        return null;
    }
}