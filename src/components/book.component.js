import React, { Component } from "react";
import BookDataService from '../services/book.services';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.onChangeImages = this.onChangeImages.bind(this);

    this.state = {
      currentBook: {
        id: null,
        name: "",
        rating: "",
        images: [],
        status: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeName(e) {
    
    /**/const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          data:{
            ...prevState.currentBook.data,
            name: name}
        }
      };
    });
    console.log(this.state)
  }

  onChangeRating(e) {
    const rating = e.target.value;
    
    this.setState(prevState => ({
        currentBook: {
        ...prevState.currentBook,
        data:{
          ...prevState.currentBook.data,
          rating: rating}
      }
    }));
  }

  onChangeImages(e) {
      const {id, value} = e.target;
     let newArray = [...this.state.currentBook.data.images];
      newArray[id] = value;
    
      this.setState(prevState => ({
          currentBook: {
          ...prevState.currentBook,
          data:{
            ...prevState.currentBook.data,
            images: newArray}
        }
      }));
  }

  getBook(id) {
    BookDataService.get(id)
      .then(response => {
        this.setState({
        currentBook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      _id: this.state.currentBook._id,
      name: this.state.currentBook.name,
      images: this.state.currentBook.images,
      rating: this.state.currentBook.rating,
      active: status
    };

    BookDataService.update(this.state.currentBook._id, data)
      .then(response => {
        this.setState(prevState => ({
            currentBook: {
            ...prevState.currentBook,
            active: status,
            message: "The book was updated successfully!"
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {
    BookDataService.update(
      this.state.currentBook.data._id,
      this.state.currentBook.data
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The book was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBook() {    
    BookDataService.delete(this.state.currentBook.data._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/book')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook.data ? (
          <div className="edit-form">
            <h4>Book</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  rating="text"
                  className="form-control"
                  id="name"
                  value={currentBook.data.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                  rating="text"
                  className="form-control"
                  id="rating"
                  value={currentBook.data.rating}
                  onChange={this.onChangeRating}
                />
              </div>
              {currentBook.data.images.map((image, index) => 
              <div className="form-group" key = {index}>
                <label htmlFor="images">Images</label>
                <input
                  rating="text"
                  className="form-control"
                  id={index}
                  value={image}
                  onChange={this.onChangeImages}
                />
              </div>)}
            </form>

            {currentBook.active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                Deactivated
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Activated
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBook}
            >
              Delete
            </button>

            <button
              rating="submit"
              className="badge badge-success"
              onClick={this.updateBook}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}