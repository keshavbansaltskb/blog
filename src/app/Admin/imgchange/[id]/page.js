"use client";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import AdminNav from "../../Admin_Component/AdminNav";

export default function page() {
    const {id} = useParams();
    const [file, setFile] = useState('');
    const Router = useRouter();
    const uploadFile = (e) => {
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

        e.preventDefault();
        if (!file) {
            console.error("File is missing.");
            return;
        }
        const data = new FormData();
        data.append("file", file, code+".jpg");
        axios.post("http://localhost:3000/api/admin/file", data).then((result) => {
            console.log("Success:", result.data);
        })
        .catch((error) => {
            console.error("Error uploading file:", error);
            
        });

        axios.put("http://localhost:3000/api/admin/topic",{id:id,code:code}).then((res)=>{ 
            console.log("Success:", res.data);
        }).catch((error) => {
            console.error("Error updateing code:", error);
            
        });
        const link = `/Admin/EditTopic/${id}`;
        Router.push(link);
    }

    return (
        <>
        <AdminNav />
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-sm-8">
                        <form onSubmit={uploadFile}>
                            <div className="card">
                                <div className="card-header" style={{ textAlign: "center", fontSize: "20px", fontFamily: "serif" }}>Edit Image</div>
                                <div className="card-body">
                                    <label>Image :</label>
                                    <input type="file" name="file" className="form-control" onChange={(e) => setFile(e.target.files?.[0])} /><br/>
                                </div>
                                <div className="card-footer">
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
        </>
    );
}
