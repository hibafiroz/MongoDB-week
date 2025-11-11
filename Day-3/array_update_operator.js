// 2. Array Update Operators

// Operators covered:
// $push, $addToSet, $pull, $pop, $each, $position, $slice, $sort


    // 1. $push — add a value to array
    await students.updateOne(
      { name: "Sara" },
      { $push: { subjects: "English" } }
    );

    // 2. $addToSet — add only if not already present
    await students.updateOne(
      { name: "Sara" },
      { $addToSet: { subjects: "Math" } } // won't add duplicate
    );

    // 3. $pull — remove specific value
    await students.updateOne(
      { name: "Sara" },
      { $pull: { subjects: "Science" } }
    );

    // 4. $pop — remove first (-1) or last (1) element
    await students.updateOne(
      { name: "Sara" },
      { $pop: { subjects: 1 } } // removes last element
    );

    // 5. $push with $each — push multiple values
    await students.updateOne(
      { name: "Sara" },
      {
        $push: {
          scores: { $each: [90, 88, 95] }
        }
      }
    );

    // 6. $push with $position — insert at specific index
    await students.updateOne(
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
    await students.updateOne(
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
    await students.updateOne(
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