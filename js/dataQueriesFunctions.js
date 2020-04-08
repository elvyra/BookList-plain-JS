//----------------------------------------------------
// Returns list of categories
//----------------------------------------------------
export function selectAllCategories(catalog) {
  let categories = [];
  for (let category in catalog) categories.push(category);
  return categories;
}

//----------------------------------------------------
// Creates new book entry
//----------------------------------------------------
export function createNewBook(category, ISBN, year, title, pages, catalog) {
  if (ISBN.length > 0 && title.length > 0 && !isNaN(pages))
    try {
      let book = {
        ISBN: ISBN,
        "Išleidimo metai": year,
        "Bendroji antraštė": title,
        "Apimtis (puslapiais)": pages
      };
      catalog[category].push(book);
    } catch (err) {
      return err;
    }
  else {
    let err = new Error(
      "Nepavyko įterpti įrašo (netinkamai užpildyti duomenys)"
    );
    return err;
  }
}

//----------------------------------------------------
// Searches for books
//----------------------------------------------------
export function searchForBooks(category, ISBN, title, catalog) {
  let list = [];
  if (category.length > 0) list = catalog[category].map(item => item);
  else {
    for (let category in catalog) list.push(...catalog[category]);
  }
  if (ISBN.length > 0) list = list.filter(item => item.ISBN.includes(ISBN));
  if (title.length > 0)
    list = list.filter(item =>
      item["Bendroji antraštė"].toLowerCase().includes(title.toLowerCase())
    );
  return list;
}
