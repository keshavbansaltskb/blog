import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request){
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db= Client.db();
    const collection = db.collection("category");
    var stud = await  collection.find().toArray();
    return NextResponse.json({result:stud});
}

export async function POST(request){
    let {category,code} = await request.json();
    var myDateString = Date("<YYYY-mm-dd>");
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db=client.db();
    const collection = db.collection("category");
    await collection.insertOne({
        category : category,
        code :code,
        dt:myDateString
    });
    client.close();
    return NextResponse.json({result:"Success"});
}

