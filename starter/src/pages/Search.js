import * as React from 'react';
import {Link} from "react-router-dom";

export function Search({ books, moveBook, searchBooks }) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            autoFocus={true}
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => searchBooks(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            books.map((book) => {
              console.log(book)
              return <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks?.smallThumbnail && <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                    }}></div>}
                    <div className="book-shelf-changer">
                      <select value={
                        book.shelf ? book.shelf : "move"
                      } onChange={(e) => moveBook(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  {book.title && <div className="book-title">{book.title}</div>}
                  {book.authors && <div className="book-authors">{book.authors}</div>}
                </div>
              </li>
            })
          }
        </ol>
      </div>
    </div>
  );
}