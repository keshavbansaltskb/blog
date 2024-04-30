"use client";
import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Category(){
    const {id} = useParams();
    const [category,setCategory] = useState("");
    const [rec,setRec] = useState([]);
    const link = "/blog.jpg";

    useEffect(() => {
        axios.get("http://localhost:3000/api/blog/category/" + id)
            .then((req) => {
                setRec(req.data.result);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    return(
        <>
            <Navbar />
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
            <br/>
            
                 <div className="row">
                    <div className="col-lg-12 imagecat">
                        <img src={link} className="img-fluid categoryimg" style={{width:"100%"}}></img>
                        <lable className="blogcategory">{category} Blog</lable>
                    </div>
                 </div>
                 <br/><br/>
                 <div className="row">
                      {rec.map((record) => {
                            if(category==""){
                                setCategory(record.category);
                            }  
                            const view = `/Topic/${record.code}`;
                            const link = `/${record.code}.jpg`;
                            return <div className="col-lg-3" key={record._id}>
                                <div className="topiccard">
                                    <label><img src={link} className="img-fluid"></img></label><br/><br/>
                                    <Link href={view} style={{color:"black"}}><label className="topicname">{record.topic}</label></Link><br/><br/>
                                    <label className="sdesname">
                                    {record.sdes && record.sdes.length >60
                                        ? `${record.sdes.substring(0,60)}...`
                                        : record.sdes}
                                    </label>
                                    <br/><br/>
                                    <Link href={view}><button className="btn btn-outline-danger">Read More</button></Link>
                                </div>
                            </div>
                            }   
                        )}
                 </div>
            </div>
            <Footer />
        </>
    )
}