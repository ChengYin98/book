import React from 'react';
import BookDataService from '../services/book.services';

export default class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.addImages = this.addImages.bind(this);
        this.newBook = this.newBook.bind(this);
        this.checkError = this.checkError.bind(this);
        this.validForm = this.validForm.bind(this);

        this.state = {
            id: null,
            images: [],
            name: '',
            rating: '',
            value: '',
            error: {
                name: '',
                type: ''
            }
        }
    }

    onChangeName(e) {
        this.checkError(e);
        this.setState({
            name: e.target.value,
        })
    }

    onChangeRating(e) {
        this.checkError(e);
        this.setState({
            rating: e.target.value
        })
    }

    onChangeImages(e) {
        this.setState({
            value: e.target.value
        })
    }

    checkError(e) {
        const { name, value } = e.target;
        let errors = this.state.error;

        switch (name) {
            case 'name':
                errors.name = (value.length < 5) ? 'Name must be 5 characters long' : ''
                break;

            case 'type':
                errors.type = (value.length < 5) ? 'Rating must be 5 characters long' : ''
                break;
            default:
                break;
        }
        this.setState({
            error: errors
        })
        console.log(errors)
    }

    validForm(error) {
        let valid = true;
        Object.values(error).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    saveBook() {
        if (this.validForm(this.state.error)) {
            var data = {
                name: this.state.name,
                rating: this.state.rating,
                images: this.state.images,
            };
            BookDataService.create(data)
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        rating: response.data.rating,
                        images: response.data.images,

                        submitted: true,
                    })
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            console.log('InvalidForm')
        }
        /**/
    }

    newBook() {
        this.setState({
            id: null,
            name: "",
            rating: "",
            images: "",
            submitted: false
        });
    }

    addImages() {
        const list = this.state.images.concat(this.state.value)
        this.setState({
            images: list
        })
        console.log(this.state.images)
    }
    render() {
        const error = this.state.error;
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newBook}>
                            Add
                </button>
                    </div>
                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    name="name"
                                />
                                {error.name.length > 0 &&
                                    <span className='error'>{error.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rating"
                                    required
                                    value={this.state.rating}
                                    onChange={this.onChangeRating}
                                    name="rating"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="images">Images</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="images"
                                    required
                                    value={this.state.value}
                                    onChange={this.onChangeImages}
                                    name="images"
                                />
                            </div>
                            <button onClick={this.addImages} className="btn btn-info">
                                Add
                            </button>

                            <button onClick={this.saveBook} className="btn btn-success">
                                Submit
                </button>
                        </div>
                    )}
            </div>
        );
    }
}