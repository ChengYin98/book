import React from "react";

export default class BookTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let book = this.props.book;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {book && book.map((book, index) =>
                        <tr key={index}>
                            <td>{book.name}</td>
                            <td>{book.rating}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}