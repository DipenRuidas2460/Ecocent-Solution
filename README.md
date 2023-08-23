# Ecocent-Solution

Clone the Repository:

bash
Copy code
git clone https://github.com/DipenRuidas2460/Ecocent-Solution
cd Ecocent-Solution
Install Dependencies:

Install the required dependencies using npm:


npm install
Set Up MongoDB:


Start the Server:

Start the Node.js server:

At first create server.js file then model then create route then crate controller 
In controller validate each field then execute it.

npm start to start the server
The server will run on http://localhost:3000.

API Endpoints
The API provides the following endpoints for managing books:

GET /books: Retrieve a list of all books.
GET /books/:id: Retrieve details of a specific book by its ID.
POST /books: Add a new book to the collection.
PUT /books/:id: Update details of a specific book by its ID.
DELETE /books/:id: Delete a book from the collection by its ID.


Here are examples of how to use the API endpoints:

GET /books:

Retrieve a list of all books.

Response:

json
Copy code
[
  {
    "_id": "61516716223a142ebc3e0e63",
    "title": "Sample Book",
    "author": "John Doe",
    "publishedYear": 2022
  },
  {
    "_id": "6151675b223a142ebc3e0e64",
    "title": "Another Book",
    "author": "Jane Smith",
    "publishedYear": 2018
  }
]
GET /books/:id:

Retrieve details of a specific book by its ID.

Response:

json
Copy code
{
  "_id": "61516716223a142ebc3e0e63",
  "title": "Sample Book",
  "author": "John Doe",
  "publishedYear": 2022
}
POST /books:

Add a new book to the collection.

Request:

json
Copy code
{
  "title": "New Book",
  "author": "Alice Johnson",
  "publishedYear": 2020
}
Response:

json
Copy code
{
  "_id": "61516ab7223a142ebc3e0e65",
  "title": "New Book",
  "author": "Alice Johnson",
  "publishedYear": 2020
}
PUT /books/:id:

Update details of a specific book by its ID.

Request:

json
Copy code
{
  "title": "Updated Book Title"
}
Response:

json
Copy code
{
  "_id": "61516716223a142ebc3e0e63",
  "title": "Updated Book Title",
  "author": "John Doe",
  "publishedYear": 2022
}
DELETE /books/:id:

Delete a book from the collection by its ID.

Response:

json
Copy code
{
  "_id": "61516ab7223a142ebc3e0e65",
  "title": "New Book",
  "author": "Alice Johnson",
  "publishedYear": 2020
}

Techstack Used:-

Node.js
Express.js
MongoDB
nodemon