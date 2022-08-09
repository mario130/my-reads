import "./App.css";
import {useEffect, useState} from "react";
import * as booksApi from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);
  const [booksFromQuery, setBooksFromQuery] = useState([]);

  const [showSearchPage, setShowSearchPage] = useState(false);
  useEffect(async() => {
    await booksApi.getAll().then((books) => {
      setBooks(books);
    })
  }, [])

  const searchBooks = async (query) => {
    if (query.trim() === "") return
    await booksApi.search(query, 10)
      .then((booksFromSearch) => {
        if (booksFromSearch.length > 0) {
          // get each book's shelf
          booksFromSearch.forEach(async(searchBook) => {
            books.find((book) => {
              if (book.id === searchBook.id) {
                searchBook.shelf = book.shelf;
              }
            })
          })

          setBooksFromQuery(booksFromSearch);
        }
        else setBooksFromQuery([]);
      })
  }

  const moveBookToDifferentShelf = (book, shelf) => {
    booksApi.update(book, shelf)
      .then(async() => {
        await booksApi.getAll().then((books) => {
          setBooks(books);
        })
      })
  }

  const moveBookFromSearchToShelf = async(book, shelf) => {
    await booksApi.update(book, shelf)
      .then(async() => {
        await booksApi.getAll().then((books) => {
          setBooks(books);
        })
      });
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchPage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={(e) => searchBooks(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                booksFromQuery.map((book) => {
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
                          } onChange={(e) => moveBookFromSearchToShelf(book, e.target.value)}>
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
      ) : (
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
                                  onChange={(e) => moveBookToDifferentShelf(book, e.target.value)}
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
                                  onChange={(e) => moveBookToDifferentShelf(book, e.target.value)}
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
                                  onChange={(e) => moveBookToDifferentShelf(book, e.target.value)}
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
            <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
