const Model = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function book(req) {

    let book = await Model.Book.create(req.body);
    return book;

}

async function getBook(req) {
    let page = null;
    let limit = null;
    page = req.body.page ? Number(req.body.page) : 1;
    limit = req.body.limit ? Number(req.body.limit) : 10;
    let skip = Number((page - 1) * limit);
    let id = req.params.id;
    if (id == null) {
        let qry = {

        };
        if (req.query.search) {
            const regex = new RegExp(req.query.search, "i");
            qry._search = regex;
        }

        let pipeline = [{
                $match: {
                    isDeleted: false
                }
            },
            {
                $addFields: {
                    _search: {
                        $concat: ["$title"]
                    }
                }
            },
            {
                $match: qry
            },

            {
                $sort: {
                    createdAt: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ];
        let countPipeline = [{
                $match: {
                    isDeleted: false
                }
            },
            {
                $addFields: {
                    _search: {
                        $concat: ["$title"]
                    }
                }
            },
            {
                $match: qry
            }
        ];
        let book = await Model.Book.aggregate(pipeline);
        let totalbook = await Model.Book.aggregate(countPipeline);
        totalbook = totalbook.length;
        return {
            book,
            totalbook
        };

    } else {
        let book = await Model.Book.findOne({
            _id: new ObjectId(req.params.id),
            isDeleted: false
        });
        if (book === null) throw new Error("BOOK NOT FOUND");
        return book;

    }


}
async function updateBook(req) {
    let id = req.params.id;
    let book = await Model.Book.findById(id).lean();
    if (!book) throw new Error("Book Not Found");
    book = await Model.Book.findOneAndUpdate({
        _id: book._id
    }, req.body, {
        new: true
    }).lean();
    return book;

}
async function deleteBook(req) {
    let id = req.params.id;
    let book = await Model.Book.findOne({_id:id,isDeleted:false}).lean();
    console.log('book: ', book);
    if (!book) throw new Error("Book Not Found");
   await Model.Book.findOneAndUpdate({
        _id: book._id
    }, {
        isDeleted: true
    });
    return {};

}
module.exports = {
    book,
    getBook,
    updateBook,
    deleteBook
};