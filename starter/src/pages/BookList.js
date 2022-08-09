import * as React from 'react';
import {Link} from "react-router-dom";

export function BookList({ books, moveBook }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.shelf === "currentlyReading").map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          {book.imageLinks?.smallThumbnail && <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                          }}></div>}
                          <div className="book-shelf-changer">
                            <select
                              value={book.shelf}
                              onChange={(e) => moveBook(book, e.target.value)}
                            >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors && <div className="book-authors">{book.authors}</div>}
                      </div>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.shelf === "wantToRead").map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          {book.imageLinks?.smallThumbnail && <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                          }}></div>}
                          <div className="book-shelf-changer">
                            <select
                              value={book.shelf}
                              onChange={(e) => moveBook(book, e.target.value)}
                            >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors && <div className="book-authors">{book.authors}</div>}
                      </div>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.filter((book) => book.shelf === "read").map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          {book.imageLinks?.smallThumbnail && <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                          }}></div>}
                          <div className="book-shelf-changer">
                            <select
                              value={book.shelf}
                              onChange={(e) => moveBook(book, e.target.value)}
                            >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors && <div className="book-authors">{book.authors}</div>}
                      </div>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}