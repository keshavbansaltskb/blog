import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";

export async function GET(request,content){
    let cat = content.params.id;
    console.log(cat);
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/blogsite");
    const db= Client.db();
    const collection = db.collection("category");
    const stud = await collection.findOne({category:cat});
    return NextResponse.json({result:stud});
}