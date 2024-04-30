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
    const searchid = decodeURIComponent(id);
    const [rec,setRec] = useState([]);
    const [topic,setTopic] = useState([]);
    const Router = useRouter();
    useEffect(() => {
        axios.get("http://localhost:3000/api/blog/search/"+searchid).then((req)=>setRec(req.data.result));  
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
    return (
        <main>
            <Navbar />
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
                <br/><br/>
                
                    <br/><br/>
                    <div className='row'>
                    <div className='col-lg-8'>
                        {rec.length === 0 ? (
                            <label style={{fontSize:"20px",marginLeft:"20px",fontWeight:"bold"}}>No Search Item Found, Try Another Thing...</label>
                        ) : (
                            rec.map((record) => {
                                const imglink = `/${record.code}.jpg`;
                                const view = `/Topic/${record.code}`;
                                return (
                                    <div className="col-lg-12" data-aos="fade-up" key={record._id} style={{marginBottom:"25px"}}>
                                        <div className='card topic-container'>
                                            <img src={imglink} className='img-fluid' alt={record.topic} /><br/>
                                            <label className='topic'>{record.topic}</label>
                                            <label className='description' style={{ whiteSpace: 'pre-line',margin:"20px" }}>
                                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Short Description :</span><br/>
                                                {record.sdes}
                                            </label>
                                            <Link href={view}>
                                                <button style={{marginLeft:"20px",marginBottom:"10px"}} className="btn btn-outline-danger">Read More</button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                        <div className='col-lg-4'>
                            <input type="text" className='form-control SearchClass' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' ></input><br/>
                            <button className='btn btn-danger'  onClick={Search} style={{textAlign:"right",justifyContent:"right"}}>Search</button><br/><br/>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <label className='topic'>Some Blogs:</label><br/><br/>
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
            </div>
            <Footer />
        </main>
    );
}