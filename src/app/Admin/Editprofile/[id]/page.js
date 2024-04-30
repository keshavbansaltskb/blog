"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminNav from "../../Admin_Component/AdminNav";

export default function Editprofile() {
    const {id}= useParams();
    const [rec,setRec] = useState([]);
    const Router = useRouter();
    useEffect(()=>{
        axios.get("http://localhost:3000/api/admin/addcategory/"+id).then((req)=>setRec(req.data.result));   
    },[])
    function change(e){
        setRec({...rec,[e.target.name]:e.target.value});
    }
    function submit(ids){
       axios.put("http://localhost:3000/api/admin/addcategory/"+ids, rec).then((res)=>{});    
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
                                <input type="text" name="category" value={rec.category} className="form-control" onChange={change} /><br/>
                            </div>
                            <div className="card-footer">
                                <button onClick={()=>submit(rec._id)} className="btn btn-primary">Submit</button>
                                
                            </div>
                        </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
            </div>
        </>
    )
}