import fs from "fs";
import { MongoClient } from "mongodb";


//fill database with solved_problems from json file for updating and persisting user's data 
const uri = "your mongodb cluster uri"
const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "Leetcode";//your db name
const collectionName = "solved_problems";//your collection name

// Function to load data from a JSON file
function loadSolvedProblems(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8'); // Read file
        const jsonData = JSON.parse(data); // Parse JSON data
        return jsonData;
    } catch (err) {
        console.error(`Error reading or parsing file ${filename}:`, err);
        return [];
    }
}


const filename = 'solved_problems.json'; // Path to the JSON file
const solvedProblems = loadSolvedProblems(filename);


const problems = solvedProblems.map((problem) => {
    return {'title':problem[0],'url':problem[1]};
});
try {

    //insert all solved problems into database
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const res = await collection.insertMany(problems);
   
} catch (error) {
    console.error("Error running query", error);
} finally {
    await client.close();
    console.log("MongoDB connection closed");
}