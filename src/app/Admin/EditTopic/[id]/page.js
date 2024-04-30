"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminNav from "../../Admin_Component/AdminNav";
import Link from "next/link";

export default function EditTopic() {
    const {id}= useParams();
    const [rec,setRec] = useState([]);
    const [allcategory,setAllcategory] = useState([]);
    const Router = useRouter();
    useEffect(()=>{
        axios.get("http://localhost:3000/api/admin/topic/"+id).then((req)=>setRec(req.data.result)); 
        axios.get("http://localhost:3000/api/admin/addcategory/").then((req)=>setAllcategory(req.data.result)); 
    },[])
    function change(e){
        setRec({...rec,[e.target.name]:e.target.value});
    }
    async function submit(ids){
        const response = await axios.get("http://localhost:3000/api/admin/topiccategory/" + rec.category);
        axios.put("http://localhost:3000/api/admin/topic/"+ids, {topic:rec.topic,sdes:rec.sdes,des:rec.des,category:rec.category,catcode:response.data.result.code}).then((res)=>{});    
        Router.push("/Admin/Topic/");    
    }
    const link = `/${rec.code}.jpg`;
    const imglink  = `/Admin/imgchange/${rec._id}`;
    return(
        <>
        <AdminNav />
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <img src={link} className="img-fluid" style={{marginTop:"50px"}}></img>
                    <br/><br/>
                    <button className="btn btn-primary" style={{marginLeft:"20px"}}><Link href={imglink} style={{textDecoration:"none",color:"white"}}>Change Photo</Link></button><br/><br/>
                </div>
                <div className="col-sm-6" style={{marginTop:"50px"}}>
                        <div className="card">
                            <div className="card-header" style={{textAlign:"center",fontSize: "20px", fontFamily: "serif" }}>Edit Topics :</div>
                            <div className="card-body">
                                <label>Topic Title :</label>
                                <input type="text" name="topic"  value={rec.topic}  className="form-control"   onChange={change} /><br/>
                                <label>Short Description :</label>
                                <input type="text" name="sdes"  value={rec.sdes} className="form-control" onChange={change}/><br/>
                                <label>Description :</label>
                                <textarea rows={5} cols={25} type="text" name="des"  value={rec.des}  className="form-control"  onChange={change} /><br/>
                                <label>Category :</label>
                                <select className="form-control" name="category"  onChange={change} >
                                    <option>{rec.category}</option>
                                    {allcategory.map((record) => {
                                        return <option>{record.category}</option>
                                        }   
                                    )}
                                </select>
                                
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