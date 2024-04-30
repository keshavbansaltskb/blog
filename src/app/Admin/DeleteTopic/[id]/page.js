"use client";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DeleteTopic() {
    const {id}= useParams();
    const Router = useRouter();
    useEffect(()=>{
        axios.delete("http://localhost:3000/api/admin/topic/"+id).then((req)=>console.log(req.data.result));
        Router.push("/Admin/Topic/");     
    },[])
    return(
        <></>
    )
}