const Book = require('../models/book-model')

createBook = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a book',
        })
    }

    const book = new Book(body)

    if (!book) {
        return res.status(400).json({ success: false, error: err })
    }

    book
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: book._id,
                message: 'Book created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Book not created!',
            })
        })
}

updateBook = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Book not found!',
            })
        }
        book.name = body.name
        book.images = body.images
        book.rating = body.rating
        book
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: book._id,
                    message: 'Book updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Book not updated!',
                })
            })
    })
}

deleteBook = async (req, res) => {
    await Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        console.log("Second comment:" + book)
        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }

        console.log("Third comment:" + book)
        return res.status(200).json({ success: true, data: book })
    }).catch(err => console.log(err))
}

getBookById = async (req, res) => {
    await Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }
        return res.status(200).json({ success: true, data: book })
    }).catch(err => console.log(err))
}

getBooks = async (req, res) => {
    if (req.query.name != null) {
        await Book.find({ name: new RegExp(req.query.name, "i") }, (err, book) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            if (!book) {
                return res
                    .status(404)
                    .json({ success: false, error: `Book not found` })
            }
            return res.status(200).json({ success: true, data: book })
        }).catch(err => console.log(err))
    } else {
        await Book.find({}).sort('name').exec(function (err, books) {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!books.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Book not found` })
            }
            return res.status(200).json({ success: true, data: books })
        })
    }
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBookById,
}