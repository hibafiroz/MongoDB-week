// Bulk Write Operations

//Bulk operations let us execute multiple write operations (insert, update, delete, replace) together in a single command
// which is faster and more efficient than running them one by one.

// Method: collection.bulkWrite([])

db.collection.bulkWrite([
  { insertOne: { document: { name: "Hiba", age: 22 } } },
  { updateOne: { filter: { name: "Hiba" }, update: { $set: { city: "Kochi" } }, upsert: true } },
  { deleteOne: { filter: { name: "OldUser" } } }
]);


//Types of bulk operators:

// | Operation Type |   Example Key                  | Description            |
// | -------------- |                                | ---------------------- |
// | Insert         |   insertOne                    | Adds a document        | document
// | Update         |   updateOne, updateMany        | Modifies matching docs | filter, update, upsert
// | Replace        |   replaceOne                   | Replaces entire doc    | filter, replacement
// | Delete         |   deleteOne , deleteMany       | Removes matching docs  | filter


//replaceOne():
// It completely replaces an existing document with a new one.
// It does not update individual fields — it replaces the whole document.

//syntax:
// db.collection.replaceOne(
//   <filter>,
//   <replacement>,
//   <options>
// )

db.students.replaceOne(
  { name: "Hiba" },
  { name: "Hiba", course: "MongoDB", marks: 95 },
  { upsert: true }  //optional
)



// 1. findOneAndUpdate()

// Updates one matching document and can return either the old or new document.
// syntax:

db.collection.findOneAndUpdate(
  filter,
  update,
  options
)

// Finds one student named “Aisha”
// Increases her marks by 10
// Returns the updated document

// 2. findOneAndReplace()
// Replaces the entire document with a new one.
// Example

const result = await students.findOneAndReplace(
  { name: "Aisha" },
  { name: "Aisha", marks: 95, subject: "Math" },
  { returnDocument: "after" }
);

// Explanation:
// The old document is fully replaced (not just updated)
// Only the fields in the new object remain
// // Finds a document and deletes it — also returns the deleted document.

// All three (findOneAndUpdate, findOneAndReplace, findOneAndDelete) operate atomically.
// Useful when we want to modify + immediately get the affected document.
// Option { returnDocument: "after" } helps get the updated version bcz by default, MongoDB returns the old one.
