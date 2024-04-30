"use client";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Editprofile() {
    const {id}= useParams();
    const Router = useRouter();
    useEffect(()=>{
        axios.delete("http://localhost:3000/api/admin/addcategory/"+id).then((req)=>console.log(req.data.result));
        Router.push("/Admin/Dashboard/");     
    },[])
    return(
        <></>
    )
}