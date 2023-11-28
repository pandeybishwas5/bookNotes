import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";
import 'dotenv/config'

const app = express();
const port = 3000;
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT 
});
db.connect();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let books = [];

app.get("/", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM books ORDER BY id ASC"
        );
        books = result.rows;
        res.render("index.ejs", {books});  
    } catch (error) {
        res.send(error);
    }
});


app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/edit/:title", (req, res) => {
    const bookTitle = req.params.title;
    const bookToEdit = books.find(book => book.name === bookTitle);
    res.render("edit.ejs", { book: bookToEdit });
    console.log(bookToEdit.name);
});


app.post('/update/:title', async (req, res) => {
    const bookTitleToUpdate = req.params.title;
    const updatedTitle = req.body.title;
    const updatedUrl = req.body.url;
    const updatedDescription = req.body.description;

   try {
        const updateBookQuery = `UPDATE books SET name=$1, image=$2, description=$3 WHERE name=$4;`;
        const values = [updatedTitle, updatedUrl, updatedDescription, bookTitleToUpdate];
        // Execute the update query
        const result = await db.query(updateBookQuery, values);

        if (result.rowCount > 0) {
            // If at least one row was updated, redirect to '/'
            res.redirect('/');
          } else {
            // Handle case where book to update is not found
            res.status(404).send('Book not found');
          }

   } catch (error) {
        // Handle errors
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
   }

   
});



app.post('/delete/:title', async (req, res) => {
    const bookTitleToDelete = req.params.title;
    try {
        await db.query("DELETE FROM books WHERE name = $1",[bookTitleToDelete])
        res.redirect("/");
    } catch (error) {
        res.send(error);
    }
    
});

app.post("/new", async (req, res) => {
    const name = req.body.title;
    const image = req.body.url;
    const description = req.body.description;
    try {
        await db.query(
            "INSERT INTO books (name, image, description) VALUES ($1, $2, $3)", [name, image, description]
            );
        res.redirect("/");
    } catch (error) {
        res.send(error);   
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});