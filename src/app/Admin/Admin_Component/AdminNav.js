"use client"
import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";

export default function AdminNav(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return(
        <>
           <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" style={{fontFamily:"serif",marginLeft:"20px"}}>Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                     <Link href="/Admin/Dashboard" class="navlink">
                        <li class="nav-item">
                            <label>Home</label>
                        </li>
                    </Link>
                    <Link href="/Admin/Topic" class="navlink">
                        <li class="nav-item">
                            <label>Topic</label>
                        </li>
                    </Link>
                    <Link href="/Admin/ChangePass" class="navlink">
                        <li class="nav-item">
                            <label>Change Password</label>
                        </li>
                    </Link>
                    <Link href="/Admin/Logout" class="navlink logout">
                        <li class="nav-item">
                            <label>Logout</label>
                        </li>
                    </Link>
                    
                </ul>
                </div>
            </div>
            </nav>
           
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p>This is the content of the modal.</p>
            </Modal>
        </>
    );
}