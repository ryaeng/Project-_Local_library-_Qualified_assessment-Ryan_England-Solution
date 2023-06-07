function getTotalBooksCount({ length: booksCount }) {
  return booksCount;
}

function getTotalAccountsCount({ length: accountsCount }) {
  return accountsCount;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => {
    const { borrows: bookBorrows } = book;
    const borrowed = bookBorrows.some(({ returned: borrowReturned }) => !borrowReturned);
    if (borrowed) count += 1;
    return count
  }, 0);
}

function getGenres(books) {
  return books.reduce((result, { genre: genreName }) => {
    const found = result.find((item) => item.name === genreName);
    if (!found) result.push({ name: genreName });
    return result;
  }, []);
}

function getMostCommonGenres(books, genres = getGenres(books)) {
  return genres.reduce((result, { name: genreName }) => {
    genreCount = books.filter(({ genre: bookGenreName }) => bookGenreName === genreName).length;
    result.push({ name: genreName, count: genreCount });
    return result;
  }, [])
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  return books.reduce((result, book) => {
    const { title: bookName, borrows: { length: bookCount } } = book;
    result.push({ name: bookName, count: bookCount });
    return result;
  }, [])
    .sort((bookA, bookB) => bookB.count - bookA.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  return authors.reduce((result, { id: authorID, name: { first: firstName, last: lastName } }) => {
    books.forEach(({ authorId: bookAuthorId, borrows: { length: bookBorrowCount } }) => {
      if (bookAuthorId === authorID) result.push({ name: `${firstName} ${lastName}`, count: bookBorrowCount});
    })
    return result;
  }, [])
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
