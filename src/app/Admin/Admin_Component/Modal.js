"use client"
import axios from 'axios';
import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, title, body, onCloseButtonText, onSaveChangesButtonText, onSaveChanges }) => {
  if (!isOpen) return null;

  const [category,setCategory] = useState("");
  function submit(){
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
    axios.post("http://localhost:3000/api/admin/addcategory/", {category:category,code:code}).then((result) => {
        console.log("Success:", result.data.resul);
    }) ;        
   }

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Category</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className='container'>
                <div className="row">
                   <input type="text" className="form-control" onChange={(e) => setCategory(e.target.value)} /><br/>
                </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Close
            </button>
            <div className="card-footer">
                <button onClick={()=>submit()} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal {
          display: ${isOpen ? 'block' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          overflow: auto;
        }

        .modal-dialog {
          margin: 10% auto;
          width: 80%;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        .modal-header {
          padding: 1rem;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          margin: 0;
        }

        .modal-body {
          padding: 1rem;
        }

        .modal-footer {
          padding: 1rem;
          border-top: 1px solid #dee2e6;
          display: flex;
          justify-content: flex-end;
        }

        .btn {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Modal;
