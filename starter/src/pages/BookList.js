import * as React from 'react';
import {Link} from "react-router-dom";
import {Shelf} from "../components/Shelf";

export function BookList({ books, moveBook }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf shelfName="Currently Reading" books={books.filter((book) => book.shelf === 'currentlyReading')} moveBook={moveBook} />
          <Shelf shelfName="Want to Read" books={books.filter((book) => book.shelf === 'wantToRead')} moveBook={moveBook} />
          <Shelf shelfName="Read" books={books.filter((book) => book.shelf === 'read')} moveBook={moveBook} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}