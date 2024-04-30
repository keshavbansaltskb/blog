"use client";
import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Categories() {
    const [rec,setRec]=useState([]);
    let sn=1;
    let id="";
    const Router = useRouter();
    useEffect(()=>{
        if(hasCookie("admin") == false){
            Router.push("/Admin/Index");
        }
        else{
            id = getCookie("admin");
            axios.get("http://localhost:3000/api/admin/addcategory").then((req)=>setRec(req.data.result));   
        }
    },[]);
    return(
        <>
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <table className="table table-borderless table-hover">
                        
                        <tbody>
                            <tr style={{fontWeight:"bold"}}>
                                <td>Sn</td>
                                <td>Category Name</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                            {rec.map((record) => {
                                const edit = `/Admin/Editprofile/${record._id}`;
                                const del = `/Admin/DeleteProfile/${record._id}`;
                                return <tr key={record._id}>
                                    <td>{sn++}</td>
                                    <td>{record.category}</td>
                                    <td><Link href={edit}><i className="fa fa-edit"></i> </Link></td>
                                    <td><Link href={del}><i className="fa fa-trash" style={{color:"red"}}></i> </Link></td>
                                </tr>
                                }   
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </>
    )
}