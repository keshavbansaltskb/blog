"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "../Admin_Component/AdminNav";
import { useRouter } from "next/navigation";

export default function Addtopic() {
    const [topic,setTopic] = useState("");
    const [category,setCategory] = useState("");
    const [rec,setRec] = useState([]);
    const [categorycode,setCategorycode] = useState([]);
    const [shortdes,setShortDes] = useState("");
    const [description,setDescription] = useState("");
    const Router = useRouter();
    useEffect(()=>{
        axios.get("http://localhost:3000/api/admin/addcategory").then((req)=>setRec(req.data.result));   
    },[])
    async function submit(){
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
        const code = ls.slice(0,15).join(''); 
        const response = await axios.get("http://localhost:3000/api/admin/topiccategory/" + category);
        setCategorycode(response.data.result);
        axios.post("http://localhost:3000/api/admin/topic/", {code:code,topic:topic,sdes:shortdes,des:description,category:category,catcode:response.data.result.code}).then((res)=>{});    
        Router.push(`/Admin/File?code=${code}`);
    }
    return(
        <>
        <AdminNav />
            <div className="container">
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6" style={{marginTop:"50px"}}>
                        <div className="card">
                            <div className="card-header" style={{textAlign:"center",fontSize: "20px", fontFamily: "serif" }}>Add Topics :</div>
                            <div className="card-body">
                                <label>Topic Title :</label>
                                <input type="text"  className="form-control" onChange={(e) => setTopic(e.target.value)} /><br/>
                                <label>Short Description :</label>
                                <input type="text"  className="form-control" onChange={(e) => setShortDes(e.target.value)} /><br/>
                                <label>Description :</label>
                                <textarea rows={5} cols={25} type="text"  className="form-control" onChange={(e) => setDescription(e.target.value)} /><br/>
                                <label>Category :</label>
                                <select className="form-control" onChange={(e)=>setCategory(e.target.value)} >
                                    <option> ---- Select Your Category -----</option>
                                    {rec.map((record) => {
                                        return <option>{record.category}</option>
                                        }   
                                    )}
                                </select>
                                
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