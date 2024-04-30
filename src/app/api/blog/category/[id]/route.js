import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request,content){
    let id = content.params.id;
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db= Client.db();
    const collection = db.collection("blog");
    const result = await collection.find({ catcode: id }).toArray();
    return NextResponse.json({result:result});
}
