"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "../Admin_Component/AdminNav";
import { useRouter } from "next/navigation";

export default function Category() {
    const [category,setCategory] = useState("");
    const Router = useRouter();
    useEffect(()=>{

    },[])
    function submit(){
        const ls = [];
        for (let i = 0; i <= 9; i++) {
            ls.push(i.toString());
        }
        for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
            ls.push(String.fromCharCode(i));
        }
        for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
            ls.push(String.fromCharCode(i));
        }
        for (let i = ls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ls[i], ls[j]] = [ls[j], ls[i]];
        }
        const code = ls.slice(0,6).join(''); 
        axios.post("http://localhost:3000/api/admin/addcategory/", {category:category,code:code}).then((res)=>{});    
        Router.push("/Admin/Dashboard/");    
    }
    return(
        <>
        <AdminNav />
            <div className="container">
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6" style={{marginTop:"50px"}}>
                        <div className="card">
                            <div className="card-header" style={{fontSize: "20px", fontFamily: "serif" }}>Category Name :</div>
                            <div className="card-body">
                                <input type="text" value={category} className="form-control" onChange={(e) => setCategory(e.target.value)} /><br/>
                            </div>
                            <div className="card-footer">
                                <button onClick={()=>submit()} className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
            </div>
        </>
    )
}