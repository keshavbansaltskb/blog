"use client"
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Logout(){
    const Router = useRouter();
    useEffect(()=>{
        deleteCookie("admin");
        Router.push("/Admin/Index");
    },[]) 
}