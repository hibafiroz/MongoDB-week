// 2. Array Update Operators

// Operators covered:
// $push, $addToSet, $pull, $pop, $each, $position, $slice, $sort


    // 1. $push — add a value to array
    db.students.updateOne(
      { name: "Sara" },
      { $push: { subjects: "English" } }
    );

    // 2. $addToSet — add only if not already present
    db.students.updateOne(
      { name: "Sara" },
      { $addToSet: { subjects: "Math" } } // won't add duplicate
    );

    // 3. $pull — remove specific value
    db.students.updateOne(
      { name: "Sara" },
      { $pull: { subjects: "Science" } }
    );

    // 4. $pop — remove first (-1) or last (1) element
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
    db.students.updateOne(
      { name: "Sara" },
      {
        $push: {
          subjects: {
            $each: ["History"],
            $position: 0 // insert at beginning
          }
        }
      }
    );

    // 7. $push with $slice — limit array size
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
    
// Position, Slice, Sort is not used with addToSet bcz it only focus on uniqueness in elements but
// These three hepler operations used to focus on length of the array so only push operator can work with them.
//before using these three helper operation, we should use $each in every operation, its compulsary.


//Array filters and positional operators($):

//The $ operator updates the first matching element in an array that meets the query condition.

//Array filters let us update specific elements inside an array, not all of them.
// Before array filters existed, MongoDB could only update one matching element using $ positional operator
// Now we can target multiple or filtered elements using arrayFilters.

db.students.updateOne({ name: 'Hiba', scores: 5 }, { $set: { "scores.$": 50 } })
// this changes element 5 in score field into 50

db.students.updateOne({ name: 'Hiba', scores: 5 }, { $unset: { "scores.$": 1 } }) 
// this replaces 5 with null, but it wont remove completely bcz the array size remain unchanged

db.students.updateOne({ name: 'Hiba', scores: 5 }, { $pull: { "scores.$": 1 } }) 
// this will remove completely (5)



//Positional Operator in Nested Docs:

// example:
// {
//   name: "Hiba",
//   tasks: [
//     { title: "Portfolio - Design", status: "pending" },
//     { title: "Cosmetics - Backend", status: "pending" }
//   ]
// }

//changing status of portfolio-design
db.students.updateOne(
  { name: "Hiba", "tasks.title": "Portfolio - Design" },
  { $set: { "tasks.$.status": "done" } }
)