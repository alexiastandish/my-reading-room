const config = {
  books: 'isbn',
  magazines: 'circulation',
};

export const getRowParamValue = (tableId: string) => {
  switch (tableId) {
    case 'books':
      return config.books;
    case 'magazines':
      return config.magazines;
    default:
      return 'isbn';
  }
};
