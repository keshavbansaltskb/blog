import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request){
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db= Client.db();
    const collection = db.collection("blog");
    var stud = await  collection.find().toArray();
    return NextResponse.json({result:stud});
}
