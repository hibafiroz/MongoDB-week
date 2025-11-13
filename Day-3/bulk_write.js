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

// | Method               | Returns Updated Doc?   | Purpose                         |
// | -------------------- | -------------------    | ------------------------------- |
// | `updateOne()`        |     No                 | Just update                     |
// | `findOneAndUpdate()` |     Yes                | Update **and** get updated data |


db.users.findOneAndUpdate(
  { name: "Hiba" },
  { $set: { city: "Kochi" } },
  { returnDocument: "after" }
)
// returnDocument: "before" - returns the document before it was updated (default)
// returnDocument: "after" - returns the document after the update.

//output:    { name: "Hiba", age: 22, city: "Kochi" }


// 2. findOneAndReplace()
// Replaces the entire document with a new one.
//It’s like replaceOne() but also returns the old or new document
// Example

db.students.findOneAndReplace(
  { name: "Aisha" },
  { name: "Aisha", marks: 95, subject: "Math" },
  { returnDocument: "after" }
);

// Explanation:
// The old document is fully replaced (not just updated)
// Only the fields in the new object remain
// // Finds a document and deletes it — also returns the deleted document.

// these 2 Useful when we want to modify and immediately get the affected document.


// 3. findOneAndDelete():

// It finds one document that matches your filter
// and deletes it — then returns the deleted document.
// So you can see what got deleted.

db.users.findOneAndDelete({ name: "Hiba" })

// deleteOne() - deletes but returns just { acknowledged, deletedCount }
// findOneAndDelete() - deletes and returns the deleted document itself