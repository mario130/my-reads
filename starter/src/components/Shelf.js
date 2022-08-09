import * as React from 'react';
import {Book} from "./Book";

export function Shelf({shelfName, books, moveBook}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book) => (
              <Book key={book.id} book={book} moveBook={moveBook} />
            ))
          }
        </ol>
      </div>
    </div>
  );
}