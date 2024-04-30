"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar(){
    const [rec,setRec]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/blog/category").then((req)=>setRec(req.data.result));   
    },[]);
    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand"><span style={{fontFamily:"serif",marginLeft:"20px",color:"red",fontWeight:"bold"}}>Life</span><span style={{fontFamily:"serif",color:"black"}}>Style</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                     <Link href="/" class="navlink">
                        <li class="nav-item">
                            <label>Home</label>
                        </li>
                    </Link>
                    {rec.map((record) => {
                        const link = `/Category/${record.code}`;
                        return <Link href={link} class="navlink">
                                <li class="nav-item">
                                    <label>{record.category} Blog</label>
                                </li>
                          </Link>
                        }   
                    )}
                    
                    
                    
                </ul>
                </div>
            </div>
            </nav>
           
        </>
    );
}