import React from "react";
import BookDataService from '../services/book.services';
import { Link } from "react-router-dom";

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveBook = this.retrieveBook.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBook = this.removeAllBook.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      book: [],
      currentBook: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveBook();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveBook() {
    BookDataService.getAll()
      .then(response => {
        this.setState({
          book: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBook();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  removeAllBook() {
    BookDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
      /*this.retrieveBook()
      let allBook = this.state.book;
      const keyword = this.state.searchName;
      allBook = allBook.filter((book) => {
        let bookName = book.name.toLowerCase()
        return bookName.indexOf(
          keyword.toLowerCase()) !== -1
      })
      console.log("First")
      this.setState({
          book: allBook
      })*/
    BookDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          book: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, book, currentBook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Book List</h4>

          <ul className="list-group">
            {book.data &&
              book.data.map((book, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  {book.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBook}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>Images:</strong>
                </label>{" "}
                {currentBook.images.map((image,i) => <img src={image} alt="Lights" style={{width:`100%` }} key={i}/>)}
              </div>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentBook.name}
              </div>
              <div>
                <label>
                  <strong>Rating:</strong>
                </label>{" "}
                {currentBook.rating}
              </div>

              <Link
                to={"/book/" + currentBook._id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Book...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}