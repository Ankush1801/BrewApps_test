const router = require("express").Router();
const Controllers = require("../controllers").user;
router.post("/book", Controllers.book);
router.get("/book/:id?", Controllers.getBook);
router.put("/book/:id", Controllers.updateBook);
router.delete("/book/:id", Controllers.deleteBook);
module.exports = router;
