import { NextResponse } from "next/server";

//define the external API URL
const EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts"

export async function GET() {
    try{
        const response =await fetch(EXTERNAL_API_URL)


        if(!response.ok){
            return NextResponse.json({
                success:false, message:"Failed Fetch the data from API", status:response.status
            })
        }
        const data= await response.json()
        return NextResponse.json({success:true, data})
        
    }catch(error:any){
        return NextResponse.json({
            success:false, message: "Get the error!", error:error.message
        })
    }
}