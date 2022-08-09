import "./App.css";
import {useEffect, useState} from "react";
import * as booksApi from "./BooksAPI";
import { Routes, Route } from "react-router-dom";
import {BookList} from "./pages/BookList";
import {Search} from "./pages/Search";

function App() {
  const [books, setBooks] = useState([]);
  const [booksFromQuery, setBooksFromQuery] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(async() => {
    await booksApi.getAll().then((books) => {
      setBooks(books);
    })
  }, [])

  const searchBooks = async (query) => {
    setQuery(query);
    if (query.trim() === "") {
      return
    }
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
      <Routes>
        <Route path="search" element={<Search books={booksFromQuery} moveBook={moveBookFromSearchToShelf} searchBooks={searchBooks} query={query} />} />
        <Route exact path="/" element={<BookList books={books} moveBook={moveBookToDifferentShelf} />} />
      </Routes>
    </div>
  );
}

export default App;
