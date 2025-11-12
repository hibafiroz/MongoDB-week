// 3. Upsert Option

// Syntax: updateOne(filter, update, { upsert: true })
// Meaning: If the document doesn’t exist, MongoDB will create it.


    // Upsert example
    db.students.updateOne(
      { name: "John" }, // Filter
      { 
        $set: { age: 21, grade: "A" },
        $setOnInsert: { createdAt: new Date() } // Only added when john exist if not nothing happens
      },
      { upsert: true } // If we add this it will creates new doc
    )
