import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request,content){
    let id = content.params.id;
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db= Client.db();
    const collection = db.collection("category");
    const objectId = new ObjectId(id);
    const stud = await collection.findOne({_id:objectId});
    return NextResponse.json({result:stud});
}

export async function PUT(request,content){
    let id = content.params.id;
    let {category} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db=client.db();
    const objectId = new ObjectId(id);
    const collection = db.collection("category");
    await collection.updateOne({_id:objectId},{$set:{
        category : category
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
    const collection = db.collection("category");
    
    const stud = await collection.deleteOne({_id : objectId});
    console.log(stud);
    client.close();
    return NextResponse.json({result:"Success"});
}