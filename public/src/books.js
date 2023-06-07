const { reduce } = require("../../test/fixtures/accounts.fixture");

function findAuthorById(authors, id) {
  return authors.find(({ id: authorId }) => authorId === id);
}

function findBookById(books, id) {
  return books.find(({ id: bookId }) => bookId === id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((result, book) => {
    const { borrows: bookBorrows } = book;
    bookBorrows.every((borrow) => borrow.returned) ? result[1].push(book) : result[0].push(book); 
    return result;
  }, [[], []]);
}

function getBorrowersForBook({ borrows: bookBorrows }, accounts) {
  return accounts.reduce((result, account) => {
    const { id: accountId } = account;
    bookBorrows.forEach((borrow) => {
      const { id: borrowId } = borrow;
      if (borrowId === accountId) {
        account.returned = bookBorrows.every(({ returned: borrowReturned }) => borrowReturned);
        result.push(account);
      }
    });
    return result;
  }, []).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
