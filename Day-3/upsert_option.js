// 3. Upsert Option

// Syntax: updateOne(filter, update, { upsert: true })
// Meaning: If the document doesn’t exist, MongoDB will create it.


    // Upsert example
    db.students.updateOne(
      { name: "John" }, // Filter
      { 
        $set: { age: 21, grade: "A" },
        $setOnInsert: { createdAt: new Date() } // Only added when inserted
      },
      { upsert: true } // If "John" doesn't exist → creates new doc
    )
