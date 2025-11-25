//customer collection:
[
  {
    _id: ObjectId('691eb08aad60b46a67cebea4'),
    name: 'Aisha',
    email: 'aisha@example.com',
    phone: '9333543330'
  },
  {
    _id: ObjectId('691eb08aad60b46a67cebea5'),
    name: 'Riya',
    email: 'riya@example.com',
    phone: '9876599999'
  },
  {
    _id: ObjectId('691eb08aad60b46a67cebea6'),
    name: 'Hiba',
    email: 'hiba@example.com',
    phone: '7007007000'
  }
]

//order collection:
[
  {
    _id: ObjectId('691eb0f9ad60b46a67cebea7'),
    orderNo: 'ORD101',
    customerId: ObjectId('691eb08aad60b46a67cebea4'),
    items: [
      { product: 'Lipstick', qty: 2, price: 200 },
      { product: 'Eyeliner', qty: 1, price: 150 }
    ],
    total: 550
  },
  {
    _id: ObjectId('691eb0f9ad60b46a67cebea8'),
    orderNo: 'ORD102',
    customerId: ObjectId('691eb08aad60b46a67cebea6'),
    items: [ { product: 'Foundation', qty: 1, price: 800 } ],
    total: 800
  },
  {
    _id: ObjectId('691eb0f9ad60b46a67cebea9'),
    orderNo: 'ORD103',
    customerId: ObjectId('691eb08aad60b46a67cebea5'),
    items: [ { product: 'Perfume', qty: 1, price: 1500 } ],
    total: 1500
  }
]

//Now instead of showing only customer id in order collection, i want to show complete customer detail in one query
//So we use aggregate framework using lookup operator
//The Lookup operator allows us to fetch data from two related documents where the relation is created using reference approach.

db.order.aggregate({    //we should pass object syntax bcz theres only single object id storing in order collection or can use array 
    $lookup: {
        from: "customers",          //specify collection we want to query
        localField: "customerId",  //specify local field that is storing reference collection
        foreignField: "_id",       //specify which field storing this reference id in customers collection
        as: "customerInfo"         //specify how to store fetched data in order collection
    }
})


// the output will be:
[
  {
    _id: ObjectId('691eb0f9ad60b46a67cebea7'),
    orderNo: 'ORD101',
    customerId: ObjectId('691eb08aad60b46a67cebea4'),
    items: [
      { product: 'Lipstick', qty: 2, price: 200 },
      { product: 'Eyeliner', qty: 1, price: 150 }
    ],
    total: 550,
    customerInfo: [
      {
        _id: ObjectId('691eb08aad60b46a67cebea4'),
        name: 'Aisha',
        email: 'aisha@example.com',
        phone: '9333543330'
      }
    ]
  },
  {
    _id: ObjectId('691eb0f9ad60b46a67cebea8'),
    orderNo: 'ORD102',
    customerId: ObjectId('691eb08aad60b46a67cebea6'),
    items: [ { product: 'Foundation', qty: 1, price: 800 } ],
    total: 800,
    customerInfo: [                       //stored in an array
      {
        _id: ObjectId('691eb08aad60b46a67cebea6'),
        name: 'Hiba',
        email: 'hiba@example.com',
        phone: '7007007000'
      }
    ]
  },
  {
    _id: ObjectId('691eb0f9ad60b46a67cebea9'),
    orderNo: 'ORD103',
    customerId: ObjectId('691eb08aad60b46a67cebea5'),
    items: [ { product: 'Perfume', qty: 1, price: 1500 } ],
    total: 1500,
    customerInfo: [
      {
        _id: ObjectId('691eb08aad60b46a67cebea5'),
        name: 'Riya',
        email: 'riya@example.com',
        phone: '9876599999'
      }
    ]
  }
]


//Products collection:
[
  {
    _id: ObjectId('673b10000111111111111111'),
    name: 'Lipstick',
    category: 'Cosmetics',
    price: 200,
    stock: 120
  },
  {
    _id: ObjectId('673b10000222222222222222'),
    name: 'Eyeliner',
    category: 'Cosmetics',
    price: 150,
    stock: 90
  },
  {
    _id: ObjectId('673b10000333333333333333'),
    name: 'Foundation',
    category: 'Cosmetics',
    price: 800,
    stock: 45
  },
  {
    _id: ObjectId('673b10000444444444444444'),
    name: 'Perfume',
    category: 'Fragrance',
    price: 1500,
    stock: 60
  }
]

//The example for array aggregate:
db.order.aggregate([{
    $lookup: {
        from: "products",
        localField: "items",
        foreignField: "_id",
        as:"productInfo"
    }
}])