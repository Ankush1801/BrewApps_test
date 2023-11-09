
const services = require("../services/user");
const response = require("../../utility/response");



async function book(req, res, next) {
    try {
        let user = await services.book(req);
        return response.sendSuccessResponse(req, res, user, 200, 'BOOK_ADDED_SUCESSFULLY');
    } catch (error) {
        next(error);
    }
}
async function getBook(req, res, next) {
    try {
        let book = await services.getBook(req);
        return response.sendSuccessResponse(req, res, book, 200, 'BOOK_FETCHED_SUCESSFULLY');
    } catch (error) {
        next(error);
    }
}
async function updateBook(req, res, next) {
    try {
        let book = await services.updateBook(req);
        return response.sendSuccessResponse(req, res, book, 200, 'BOOK_FETCHED_SUCESSFULLY');
    } catch (error) {
        next(error);
    }
}
async function deleteBook(req, res, next) {
    try {
        let book = await services.deleteBook(req);
        return response.sendSuccessResponse(req, res, book, 200, 'BOOK_DELETED_SUCESSFULLY');
    } catch (error) {
        next(error);
    }
}

module.exports = {
   
    book,
    getBook,
    updateBook,
    deleteBook
};
