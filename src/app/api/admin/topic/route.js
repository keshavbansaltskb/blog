import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request){
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db= Client.db();
    const collection = db.collection("blog");
    var stud = await  collection.find().toArray();
    console.log(stud);
    return NextResponse.json({result:stud});
}

export async function POST(request){
    let {code,topic,sdes,des,category,catcode} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    var myDateString = Date("<YYYY-mm-dd>");
    let client=await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db=client.db();
    const collection = db.collection("blog");
    await collection.insertOne({
        code:code,
        topic:topic,
        sdes:sdes,
        des:des,
        category : category,
        catcode :catcode,
        dt:myDateString
    });
    client.close();
    return NextResponse.json({result:"Success"});
}


export async function PUT(request){
    let {id,code} = await request.json();
    const objectId = new ObjectId(id);
    let MongoClient = require("mongodb").MongoClient;
    let client = await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db = client.db();
    const collection = db.collection("blog");
    await collection.updateOne({_id:objectId},{$set:{code:code}});
    client.close();
    return NextResponse.json({result:"Success"});
}