"use client";
import Aos from "aos";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllTopics() {
    const [rec,setRec]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/blog/topics").then((req)=>setRec(req.data.result));   
        Aos.init({
            duration: 1500,
            once: false,
        })
    },[]);
    return(
        <>
            <div className="container">
            <div className="row" style={{marginTop:"20px"}}>
                   {rec.map((record) => {
                        const view = `/Topic/${record.code}`;
                        const link = `${record.code}.jpg`;
                        return <div className="col-lg-3"  data-aos="fade-up" key={record._id}>
                            <div className="topiccard">
                                <label><img src={link} className="img-fluid"></img></label><br/><br/>
                                <Link href={view} style={{color:"black"}}><label className="topicname">{record.topic}</label></Link><br/><br/>
                                <label className="sdesname">
                                    {record.sdes && record.sdes.length >60
                                        ? `${record.sdes.substring(0,60)}...`
                                        : record.sdes}
                                    </label>
                                    <br/>
                                    <br/>
                                <Link href={view}><button className="btn btn-outline-danger">Read More</button></Link>
                            </div>
                        </div>
                        }   
                    )}
                </div>
            </div>
        </>
    )
}