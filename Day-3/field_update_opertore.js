// 1. field update operators:

// Operators covered: 
// $set, $unset, $inc, $rename, $mul, $min, $max, $currentDate

    // 1. $set — set or update field value
    db.students.updateOne(
      { name: "Aliya" },
      { $set: { grade: "A", city: "London" } }
    );

    // 2. $unset — remove a field
    db.students.updateOne(
      { name: "Aliya" },
      { $unset: { city: "" } }
    );

    // 3. $inc — increment numeric value
    await students.updateOne(
      { name: "Aliya" },
      { $inc: { marks: 10 } }
    );

    // 4. $rename — rename a field
    db.students.updateOne(
      { name: "Aliya" },
      { $rename: { grade: "finalGrade" } }
    );

    // 5. $mul — multiply a numeric field
    await students.updateOne(
      { name: "Aliya" },
      { $mul: { marks: 1.1 } } // increase marks by 10%
    );

    // 6. $min — update only if value is smaller
    db.students.updateOne(
      { name: "Aliya" },
      { $min: { lowestScore: 30 } }
    );

    // 7. $max — update only if value is greater
    db.students.updateOne(
      { name: "Aliya" },
      { $max: { highestScore: 90 } }
    );

    // 8. $currentDate — set current date/time
    db.students.updateOne(
      { name: "Aliya" },
      { $currentDate: { lastUpdated: true } }
    )
