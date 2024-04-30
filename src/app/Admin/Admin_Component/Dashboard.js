"use client"

import { getCookie, hasCookie } from "cookies-next";
import AdminNav from "./AdminNav"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Categories from "./Categories";

export default function Dashboard(){
    const Router = useRouter();
    let id="";
    useEffect(()=>{
        if(hasCookie("admin") == false){
            Router.push("/Admin/Index");
        }
        else{
            id = getCookie("admin");
        }
    },[]);
    return(
        <>
            {
                id=="" ?
                <div>
                    <AdminNav />
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                 <label style={{fontWeight:"bold"}}>Categories:</label>
                            </div>
                            <div className="col-sm-3">
                                <Link href="/Admin/Category/">
                                <label style={{float:"right",background:"red",color:"white",padding:"8px",borderRadius:"5px",cursor:"pointer"}}>Add Category</label>
                                </Link>
                            </div>                            
                        </div>
                    </div>
                    <Categories />
                </div>
                :null
            }
        </>
    )
}