import Link from "next/link";
import AdminTopic from "../Admin_Component/AdminTopic";
import AdminNav from "../Admin_Component/AdminNav";

export default function Topic(){
    return(
        <>
            <AdminNav />
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                            <label style={{fontWeight:"bold"}}>Topics:</label>
                    </div>
                    <div className="col-sm-3">
                        <Link href="/Admin/Addtopic/">
                        <label style={{float:"right",background:"red",color:"white",padding:"8px",borderRadius:"5px",cursor:"pointer"}}>Add Topics</label>
                        </Link>
                    </div>                            
                </div>
            </div>
            <AdminTopic />
            
        </>
       
    )
}