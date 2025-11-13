// Array Update Operators

// Operators covered:
// $push, $addToSet, $pull, $pop, $each, $position, $slice, $sort


    // 1. $push — add a value to array at the end.
    db.students.updateOne(
      { name: "Sara" },
      { $push: { subjects: "English" } }
    );

    // 2. $addToSet — add only if not already present
    db.students.updateOne(
      { name: "Sara" },
      { $addToSet: { subjects: "Math" } } // won't add duplicate
    )

    // 3. $pull — Removes specific elements from an array that match a condition.
    db.students.updateOne(
      { name: "Sara" },
      { $pull: { subjects: "Science" } }
    )

    // 4. $pop — Removes only one element — either from the start or the end of the array.
         // It doesn’t care about the value — just the position.
        // remove first(-1) or last(1) element
    db.students.updateOne(
      { name: "Sara" },
      { $pop: { subjects: 1 } } // removes last element
    );

    
    //Helping operations:

    // 5. $push with $each — push multiple values
    db.students.updateOne(
      { name: "Sara" },
      {
        $push: {
          scores: { $each: [90, 88, 95] }
        }
      }
    );

    // 6. $push with $position — insert at specific index
    // When we use $position, we must use $each,
    // even if we adding only one element.
    db.students.updateOne(
      { name: "Sara" },
      {
        $push: {
          subjects: {
            $each: ["History"],
            $position: 0 // insert at beginning (index 0)
          }
        }
      }
    );

    // 7. $push with $slice — limit array size
// add new items but limit how many stay in the array
    //if array is [22,32,93,04,28]
    db.students.updateOne(
      { name: "Sara" },
      {
        $push: {
          scores: {
            $each: [70, 75],
            $slice: -5 // keep only last 5 scores
          }
        }
      }
    );
    // output: [93,04,28,70,75]

    // 8. $push with $sort — sort array after pushing
    db.students.updateOne(
      { name: "Sara" },
      {
        $push: {
          scores: {
            $each: [60],
            $sort: 1 // ascending order
          }
        }
      }
)
    
// Position, Slice, Sort is not used with addToSet bcz addToset only focus on uniqueness in elements but
// These three hepler operations used to focus on length of the array so only push operator can work with them.
//before using these three helper operation, we should use $each in every operation, its compulsary.


//Positional operators($):

//The $ operator updates the first matching element in an array that meets the query condition.
// example:
// {
//   name: "Hiba",
//   scores: [5, 7, 9, 8]
// }

// Before array filters existed, MongoDB could only update one matching element using $ positional operator

db.students.updateOne({ name: 'Hiba', scores: 5 }, { $set: { "scores.$": 50 } })
// this changes element 5 in score field into 50

db.students.updateOne({ name: 'Hiba', scores: 5 }, { $unset: { "scores.$": 1 } }) 
// this replaces 5 with null, but it wont remove completely bcz the array size remain unchanged

db.students.updateOne({ name: 'Hiba', scores: 5 }, { $pull: { "scores.$": 1 } }) 
// this will remove completely (5)


//Array filters:

// Used when you want to update multiple specific elements inside the array that meet a condition.
//ex-1:
// {
//   name: "Sara",
//   scores: [45, 70, 80, 90]
// }

// syntax:   db.students.updateOne(Filter,updation,arrayFilters)
// Increase all scores greater than 75 by 5:
db.students.updateOne(
  { name: "Sara" },
  { $inc: { "scores.$[elem]": 5 } },
  { arrayFilters: [ { elem: { $gt: 75 } } ] }
)
//output:   { name: "Sara", scores: [45, 70, 85, 95] }

//ex-2:
[
  { name: "Sara", scores: [60, 80, 90] },
  { name: "Lina", scores: [70, 85, 95] }
]
// want to add +5 to every score greater than 80 in all documents.
db.students.updateMany(
  {},
  { $inc: { "scores.$[elem]": 5 } },
  { arrayFilters: [ { elem: { $gt: 80 } } ] }
)
// output
[
  { name: "Sara", scores: [60, 80, 95] },
  { name: "Lina", scores: [70, 85, 100] }
]

//In nested Docs:
// ex-3:
// {
//   name: "Sara",
//   grades: [
//     { subject: "Math", scores: [70, 85, 90] },
//     { subject: "Science", scores: [60, 75, 88] }
//   ]
// }
// increase all Science scores greater than 70 by 5.

db.students.updateOne(
  { name: "Sara" },
  { 
    $inc: { "grades.$[sub].scores.$[sc]": 5 } 
  },
  { 
    arrayFilters: [
      { "sub.subject": "Science" },   // Match the object in grades
      { "sc": { $gt: 70 } }           // Match each score > 70
    ]
  }
)