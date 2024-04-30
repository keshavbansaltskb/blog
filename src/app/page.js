"use client";
import AllTopics from "./AllTopics";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <main>
           <Navbar />
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
            <br/>
            
            <div className="row">
              <div className="col-lg-12 imagecat">
                <img src="blog.jpg" className="img-fluid categoryimg" style={{width:"100%"}}></img>
                <lable className="blogcategory">Blogs</lable>
              </div>
            </div>
            <br/>
            <br/>
            <AllTopics />
            
          </div>
          <Footer />
    </main>
  );
}
