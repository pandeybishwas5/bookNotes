CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image TEXT,
  description TEXT
);

INSERT INTO books (name, image, description) 
VALUES ('firstbook', 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', 'This is the first book. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor eu augue ut lectus arcu. Nullam ac tortor vitae purus faucibus ornare suspendisse. Scelerisque purus semper eget duis at tellus. Porta non pulvinar neque laoreet suspendisse. Non arcu risus quis varius quam. Morbi tristique senectus et netus et malesuada fames ac turpis. Id consectetur purus ut faucibus pulvinar elementum integer enim. In fermentum posuere urna nec tincidunt praesent semper feugiat. Eleifend quam adipiscing vitae proin sagittis. Lacus sed viverra tellus in hac. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus.');

INSERT INTO books (name, image, description) 
VALUES ('secondbook', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6nXoVl6Jys3RoMHkC44-TzaYL-oNxR1vK4LVQVGI&s', 'This is the second book. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Sit amet est placerat in egestas erat imperdiet sed euismod. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. At ultrices mi tempus imperdiet. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. At quis risus sed vulputate odio ut. Velit laoreet id donec ultrices. Enim blandit volutpat maecenas volutpat blandit. Amet commodo nulla facilisi nullam. Luctus venenatis lectus magna fringilla urna. Enim sit amet venenatis urna cursus eget nunc.');