"use client";

import Footer from '@/app/Footer';
import Navbar from '@/app/Navbar';
import Aos from 'aos';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const {id} = useParams();
    const [rec,setRec] = useState([]);
    const [topic,setTopic] = useState([]);
    const Router = useRouter();
    useEffect(() => {
        axios.get("http://localhost:3000/api/blog/topic/"+id).then((req)=>setRec(req.data.result));  
        axios.get("http://localhost:3000/api/blog/topic").then((req)=>setTopic(req.data.result)); 
        Aos.init({
            duration: 1500,
            once: false,
        })   
    }, []);

    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const Search = () => {
        if (search.trim() === '') {
            setErrorMessage('Please enter a search query.');
            } else {
            Router.push(`/Search/${search}`);
            }
        
    };
    let img = "/"+id+".jpg";
    return (
        <main>
            <Navbar />
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
                <br/><br/>
                
                    <br/><br/>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='card topic-container'>
                                <img src={img} className='img-fluid'></img><br/>
                                <label className='topic'>{rec.topic}</label>
                                <label className='description' style={{ whiteSpace: 'pre-line',margin:"20px" }}>
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Description :</span><br/>
                                {rec.des}
                                </label><br/>
                                <label className='description'><span style={{fontWeight:"bold",fontSize:"20px"}}>Date :</span><br/>{rec.dt}</label><br/><br/>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <input type="text" className='form-control SearchClass' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' ></input><br/>
                            <button className='btn btn-danger'  onClick={Search} style={{textAlign:"right",justifyContent:"right"}}>Search</button><br/><br/>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <label className='topic'>Other Blogs:</label><br/><br/>
                            {topic.slice(0,2).map((record) => {
                                const view = `/Topic/${record.code}`;
                                const link = `/${record.code}.jpg`;
                                return <div className="col-lg-12" key={record._id}>
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
                    <div className='row' style={{marginTop:"50px"}}>
                            <label className='topic'>Some Other Blogs:</label><br/><br/><br/>
                        {topic.slice(2,20).map((record) => {
                                const view = `/Topic/${record.code}`;
                                const link = `/${record.code}.jpg`;
                                return <div className="col-lg-4" data-aos="fade-up" key={record._id}>
                                    <div className="topiccard">
                                        <label><img src={link} className="img-fluid"></img></label><br/><br/>
                                        <Link href={view} style={{color:"black"}}><label className="topicname">{record.topic}</label></Link><br/><br/>
                                        <label className="sdesname">
                                        {record.sdes && record.sdes.length >50
                                            ? `${record.sdes.substring(0,50)}...`
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
        </main>
    );
}
