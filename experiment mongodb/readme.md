EXPERIMENT NO. 7 and 8

Microsoft Windows [Version 10.0.26300.10075]
(c) Microsoft Corporation. All rights reserved.

C:\Users\Pushkar Goel>mongosh
Current Mongosh Log ID: 6b03c1ede56bbf1c20ec8407
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.14.2
Using MongoDB:          9.0.8
Using Mongosh:          2.14.2
mongosh 2.14.3 is available for download: https://www.mongodb.com/try/download/shell

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

------
   The server generated these startup warnings when booting
   2026-11-20T11:13:17.877+05:30: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> use studentDB
switched to db studentDB
studentDB> db.Collection
studentDB.Collection
studentDB> db.createCollection
[Function: createCollection] AsyncFunction {
  apiVersions: [ 1, Infinity ],
  returnsPromise: true,
  serverVersions: [ '0.0.0', '999.999.999' ],
  topologies: [ 'ReplSet', 'Standalone', 'Sharded', 'LoadBalanced' ],
  returnType: { type: 'unknown', attributes: {} },
  deprecated: false,
  platforms: [ 'Compass', 'Browser', 'CLI' ],
  isDirectShellCommand: false,
  acceptsRawInput: false,
  shellCommandCompleter: undefined,
  newShellCommandCompleter: undefined,
  help: [Function (anonymous)] Help
}
studentDB> db.createCollection{'Students'}
Uncaught:
SyntaxError: Missing semicolon. (1:19)

> 1 | db.createCollection{'Students'}
    |                    ^
  2 |

studentDB> db.createCollection('Students')
{ ok: 1 }
studentDB> collections
ReferenceError: collections is not defined
studentDB> show collections
Students
studentDB> db.students.insertMany([  { rollNo: 2, name: "Diya", age: 21, brabranch: "IT", marks: 91 },  { rollNo: 3, name: "Kabir", age: 19, branch: "CSE", marks: 74 },  { rollNo: 4, name: "Meera", age: 22, branch: "ECE", marks: 88 } ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6b03c38ee56bbf1c20ec8408'),
    '1': ObjectId('6b03c38ee56bbf1c20ec8409'),
    '2': ObjectId('6b03c38ee56bbf1c20ec840a')
  }
}
studentDB> db.students.find({ marks: { $gt: 80 } })
[
  {
    _id: ObjectId('6b03c38ee56bbf1c20ec8408'),
    rollNo: 2,
    name: 'Diya',
    age: 21,
    branch: 'IT',
    marks: 91
  },
  {
    _id: ObjectId('6b03c38ee56bbf1c20ec840a'),
    rollNo: 4,
    name: 'Meera',
    age: 22,
    branch: 'ECE',
    marks: 88
  }
]
studentDB> db.students.find({ age: { $gt: 20 } })
[
  {
    _id: ObjectId('6b03c38ee56bbf1c20ec8408'),
    rollNo: 2,
    name: 'Diya',
    age: 21,
    branch: 'IT',
    marks: 91
  },
  {
    _id: ObjectId('6b03c38ee56bbf1c20ec840a'),
    rollNo: 4,
    name: 'Meera',
    age: 22,
    branch: 'ECE',
    marks: 88
  }
]
studentDB> db.students.updateOne(  { rollNo: 1 },  { $set: { age: 20 } } )
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
studentDB>  db.students.updateOne(  { rollNo: 3 },  { $set: { age: 20 } } )
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
studentDB> db.student.find()

studentDB> db.studentDB.find()

studentDB> db.students.find()
[
  {
    _id: ObjectId('6b03c38ee56bbf1c20ec8408'),
    rollNo: 2,
    name: 'Diya',
    age: 21,
    branch: 'IT',
    marks: 91
  },
  {
    _id: ObjectId('6b03c38ee56bbf1c20ec8409'),
    rollNo: 3,
    name: 'Kabir',
    age: 20,
    branch: 'CSE',
    marks: 74
  },
  {
    _id: ObjectId('6b03c38ee56bbf1c20ec840a'),
    rollNo: 4,
    name: 'Meera',
    age: 22,
    branch: 'ECE',
    marks: 88
  }
]
studentDB>