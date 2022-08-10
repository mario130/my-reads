import * as React from 'react';
import {Link} from "react-router-dom";
import {Book} from "../components/Book";
import {useEffect} from "react";

export function Search({books, moveBook, searchBooks, query}) {
  useEffect(() => {
    searchBooks(query);
  }, [])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            autoFocus={true}
            type="text"
            value={query}
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => searchBooks(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            query && books.map((book) => (<Book key={book.id} book={book} moveBook={moveBook}/>))
          }
        </ol>
      </div>
    </div>
  );
}