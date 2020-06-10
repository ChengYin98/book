import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import BookList from "./components/book-list.component";
import Book from "./components/book.component";
import AddBook from './components/add-book.component';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/books" className="navbar-brand">
              bezKoder
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/books"} className="nav-link">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Book
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/books"]} component={BookList} />
              <Route exact path="/add" component={AddBook} />
              <Route path="/book/:id" component={Book} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
