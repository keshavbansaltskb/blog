import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request,content){
    let id = content.params.id;
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db= Client.db();
    const collection = db.collection("blog");
    const objectId = new ObjectId(id);
    const stud = await collection.findOne({_id:objectId});
    return NextResponse.json({result:stud});
}


export async function PUT(request,content){
    let id = content.params.id;
    let {topic,sdes,des,category,catcode} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    var myDateString = Date("<YYYY-mm-dd>");
    let client=await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db=client.db();
    const objectId = new ObjectId(id);
    const collection = db.collection("blog");
    await collection.updateOne({_id:objectId},{$set:{
        topic:topic,
        sdes:sdes,
        des:des,
        category : category,
        catcode :catcode,
        dt:myDateString
    }});
    client.close();
    return NextResponse.json({result:"Success"});
}

export async function DELETE(request,content){
    let id = content.params.id;
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db=client.db();
    const objectId = new ObjectId(id);
    const collection = db.collection("blog");
    await collection.deleteOne({_id:objectId});
    client.close();
    return NextResponse.json({result:"Success"});
}