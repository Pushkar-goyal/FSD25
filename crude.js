//2 Perform CRUD operations on files using fs module
import fs from 'fs';
const fileName="student.txt"
//Create a file
async function createFile(){
    try{
    await fs.writeFile(fileName,"name:Satwik\n Email:abc@gmail.com","utf8");
    console.log("file created....");
    
    }
    catch(err){
        console.log("ERROR:",err.message);

    }
}
//read a file
async function readFile(){
    try{
     await fs.readFile()
    }
    catch(err){

    }}
//update a file
async function updateFile(){
try{
await fs.appendFile()
}
catch(err){

}
}
//delete a file
async function deleteFile(){
    try{
  await fs.unlink()
    }
    catch(){

    }
}
//excute a CRUD function
async function main(){
    await createFile();
   
}