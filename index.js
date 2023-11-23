import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let books = [{
    name: "firstbook", 
    image: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
    description: "This is the first book. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor eu augue ut lectus arcu. Nullam ac tortor vitae purus faucibus ornare suspendisse. Scelerisque purus semper eget duis at tellus. Porta non pulvinar neque laoreet suspendisse. Non arcu risus quis varius quam. Morbi tristique senectus et netus et malesuada fames ac turpis. Id consectetur purus ut faucibus pulvinar elementum integer enim. In fermentum posuere urna nec tincidunt praesent semper feugiat. Eleifend quam adipiscing vitae proin sagittis. Lacus sed viverra tellus in hac. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus."

},
{
    name: "secondbook",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6nXoVl6Jys3RoMHkC44-TzaYL-oNxR1vK4LVQVGI&s",
    description: "This is the second book. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Sit amet est placerat in egestas erat imperdiet sed euismod. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. At ultrices mi tempus imperdiet. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. At quis risus sed vulputate odio ut. Velit laoreet id donec ultrices. Enim blandit volutpat maecenas volutpat blandit. Amet commodo nulla facilisi nullam. Luctus venenatis lectus magna fringilla urna. Enim sit amet venenatis urna cursus eget nunc."
},
{
    name: "secondbook",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6nXoVl6Jys3RoMHkC44-TzaYL-oNxR1vK4LVQVGI&s",
    description: "This is the second book. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Sit amet est placerat in egestas erat imperdiet sed euismod. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. At ultrices mi tempus imperdiet. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. At quis risus sed vulputate odio ut. Velit laoreet id donec ultrices. Enim blandit volutpat maecenas volutpat blandit. Amet commodo nulla facilisi nullam. Luctus venenatis lectus magna fringilla urna. Enim sit amet venenatis urna cursus eget nunc."
}];

app.get("/", (req, res) => {
    res.render("index.ejs", {books});
  
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

app.post('/update/:title', (req, res) => {
    const bookTitleToUpdate = req.params.title;
    const updatedTitle = req.body.title;
    const updatedUrl = req.body.url;
    const updatedDescription = req.body.description;

    // Find the book to update
    const bookToUpdate = books.find(book => book.name === bookTitleToUpdate);

    // Update book details
    if (bookToUpdate) {
        if (updatedTitle) bookToUpdate.name = updatedTitle;

        if (updatedUrl) bookToUpdate.image = updatedUrl;

        if (updatedDescription) bookToUpdate.description = updatedDescription;

        res.redirect('/'); 
    } else {
        // Handle case where book to update is not found
        res.status(404).send("Book not found");
    }
});



app.post('/delete/:title', (req, res) => {
    const bookTitleToDelete = req.params.title;
    books = books.filter(book => book.name !== bookTitleToDelete);
    res.redirect("/");
});

app.post("/new", (req, res) => {
    const title = req.body.title;
    const url = req.body.url;
    const description = req.body.description;
    try {
        books.push({name: title, image: url, description: description});
        res.redirect("/");
    } catch (error) {
        res.send(error);   
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});