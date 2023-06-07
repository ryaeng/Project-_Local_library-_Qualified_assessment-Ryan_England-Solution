function findAccountById(accounts, id) { 
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort(({ name: { last: lastNameA } }, { name: { last: lastNameB } }) => lastNameA > lastNameB ? 1 : -1);
}

function getTotalNumberOfBorrows({ id: accountId }, books) {
  return books.reduce((count, { borrows: bookBorrows }) => {
    bookBorrows.filter(({ id: borrowId }) => {
      if (accountId === borrowId) count += 1;
    });
    return count;
  }, 0);
}

function getBooksPossessedByAccount({ id: accountId }, books, authors) {
  return books.reduce((result, book) => {
    const { borrows, authorId } = book;
    if (borrows.some(({ id: borrowId, returned: borrowReturned }) => accountId === borrowId && !borrowReturned)) {
      book.author = authors.find((author) => author.id === authorId);
      result.push(book)
    };
    return result;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
