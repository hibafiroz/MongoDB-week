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


    
//MongoDB has a special operator called $currentDate for this exact purpose.
//But $currentDate automatically replaces that with the current date/time value.
//whenever we update somthing, it shows lastUpadted time.
db.students.updateMany({}, { $currentDate: { lastUpdated: true } })
    

//Existence and Type Checks:

// 1. $exists:
// $exists is used to check if a field exists or missing in a documnt
//we use $exists to check Missing fields, Optional fields, Wrong document structure etc
// ex:

//a. check if pincode exists inside address.
db.students.find({
  "address.pincode": { $exists: true }
})  //means show only students who HAVE a pincode field.

//b. check if some students do NOT have pincode.
db.students.find({
  "address.pincode": { $exists: false }
})    //means Show students who DON'T have a pincode field.

//c. Add phone only to students who do not have it.
db.students.updateMany(
  { phone: { $exists: false } },
  { $set: { phone: "Not Provided" } }
)


// 2. $type:
// $type is used to find documents where a field is a specific type.
//$type to find out:
// Is this field a string? a number? a date? an array? an object?

// ex:  a. find students whose marks is a number.
db.students.find({
  marks: { $type: "number" }
})

//b. find students whose name is a string.
db.students.find({
  name: { $type: "string" }
})

//c. check dob:
db.students.find({
  dob: { $type: "date" }
})

//d. subjects
db.students.find({
  subjects: { $type: "array" }
})

//e. check if address is an object.
db.students.find({
  address: { $type: "object" }
})

//we use $type To check if data is saved in correct type like if someone saved marks as "98" (string) instead of number.
//To find wrong data If someone accidentally saved pincode as string.
//To filter only specific type.