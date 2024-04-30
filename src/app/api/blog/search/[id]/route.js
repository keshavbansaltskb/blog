import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request,content){
    let id = content.params.id;
    let MongoClient = require("mongodb").MongoClient;
    let Client = await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db = Client.db();
    const collection = db.collection("blog");
    
    // Use the variable 'id' in the regular expression
    const regex = new RegExp(id, 'i'); // 'i' for case-insensitive search
    
    // Use the '$or' operator to search in multiple fields
    const query = {
        $or: [
            { "topic": regex },
            { "sdes": regex },
            { "category": regex }
        ]
    };
    const stud = await collection.find(query).toArray();
    return NextResponse.json({ result: stud });
    
}
