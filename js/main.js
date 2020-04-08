"use strict";

import { catalog } from "./data.js";
import {
  listCategoriesForMenu,
  listBooksForTable,
  listCategoriesForSelect,
  errorMessage
} from "./dataToDomFunctions.js";
import {
  validTitle,
  validISBN,
  validYear,
  validPages
} from "./dataValidationFunctions.js";
import {
  selectAllCategories,
  createNewBook,
  searchForBooks
} from "./dataQueriesFunctions.js";

//------------------------------------------------------------
// DOM elements selectors
//------------------------------------------------------------

// ul element for listing all categories in catalog
const categoriesList = document.querySelector(".categories-list");
// table element for listing books array
const booksList = document.querySelector(".books-list");
// button to show new book creation form
const btnNewBook = document.querySelector("nav .newBook");
// button to show book search form
const btnSearchBook = document.querySelector("nav .searchBook");

// Form to enter new book to list and it's elements
const formNewBook = document.querySelector(".new-book");
const inputISBM = document.querySelector(".new-book input:first-of-type");
const inputYear = document.querySelector(".new-book input:nth-of-type(2)");
const inputTitle = document.querySelector(".new-book input:nth-of-type(3)");
const inputPages = document.querySelector(".new-book input:nth-of-type(4)");
const inputCategory = document.querySelector(".new-book select");
const btnCreateBook = document.querySelector(".new-book .button.create");
const btnCloseCreateBook = document.querySelector(".new-book .button.close");

// Form to search for books
const formSearch = document.querySelector(".search-book");
const searchISBM = document.querySelector(".search-book input:first-of-type");
const searchTitle = document.querySelector(".search-book input:nth-of-type(2)");
const searchCategory = document.querySelector(".search-book select");
const btnSearch = document.querySelector(".search-book .button.search");
const btnCloseSearchBook = document.querySelector(".search-book .button.close");

// p tag for error displaying
const error = document.querySelector(".error");

//------------------------------------------------------------
// Initial actions, initial Data listing to DOM
//------------------------------------------------------------

// Getting categories array from catalog
let categories = selectAllCategories(catalog);

listCategoriesForMenu(categories, categoriesList);
listCategoriesForSelect(categories, inputCategory);
listCategoriesForSelect(categories, searchCategory);
listBooksForTable(catalog[categoriesList.firstChild.textContent], booksList);

//------------------------------------------------------------
// Event Listeners
//------------------------------------------------------------

// Category selection handling
document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("category")) {
    let prev = document.querySelector(".categories-list .active");
    try {
      prev.classList.remove("active");
    } catch {}
    e.target.classList.add("active");
    listBooksForTable(catalog[e.target.textContent], booksList);
  }
});

// New book entering form showing
btnNewBook.addEventListener("click", () => {
  formNewBook.classList.remove("hide");
});

// New book creation

btnCreateBook.addEventListener("click", () => {
  // Enter new record into array with validation
  let category = inputCategory.value === "choose" ? "" : inputCategory.value;
  let ISBN = inputISBM.value;
  let year = inputYear.value;
  let title = inputTitle.value;
  let pages = inputPages.value;
  let err = false;

  if (
    category.length > 0 &&
    validTitle(title) &&
    validISBN(ISBN) &&
    validYear(year) &&
    validPages(pages)
  ) {
    try {
      err = createNewBook(category, ISBN, year, title, pages, catalog);
      if (err) errorMessage(err.message, error);
    } catch (err) {
      errorMessage(err.message, error);
    }

    if (!err)
      try {
        // Show category with new book
        listBooksForTable(catalog[category], booksList);

        // Set category with new book as active
        let prev = document.querySelector(".categories-list .active");
        prev.classList.remove("active");

        let current = document.querySelector(
          `.categories-list [value="${category}"]`
        );
        current.classList.add("active");

        // Delete form input values and hide form
        inputISBM.value = "";
        inputYear.value = "";
        inputTitle.value = "";
        inputPages.value = "";
        inputCategory.value = "";
        formNewBook.classList.add("hide");
      } catch (err) {
        errorMessage(err.message, error);
      }
  } else {
    let txt = "Patikslinkite: ";
    if (!validTitle(title)) txt += " pavadinimą";
    if (!validISBN(ISBN)) txt += " ISBN numerį";
    if (!validYear(year)) txt += " leidimo metus";
    if (!validPages(pages)) txt += " apimtį puslapiais";
    errorMessage(txt, error);
  }
});

// New book entering form closing
btnCloseCreateBook.addEventListener("click", () =>
  formNewBook.classList.add("hide")
);

// Search for book form showing
btnSearchBook.addEventListener("click", () => {
  formSearch.classList.remove("hide");
});

// Search for book initializing
btnSearch.addEventListener("click", () => {
  // Enter search
  let category = searchCategory.value === "choose" ? "" : searchCategory.value;
  let ISBN = searchISBM.value;
  let title = searchTitle.value;

  let searchList = searchForBooks(category, ISBN, title, catalog);

  let prev = document.querySelector(".categories-list .active");
  try {
    prev.classList.remove("active");
  } catch {}

  listBooksForTable(searchList, booksList);

  if (searchList.length < 1)
    errorMessage("Nė vienas įrašas neatitiko paieškos užklausos", error);

  formSearch.classList.add("hide");
});

// Search for book form closing
btnCloseSearchBook.addEventListener("click", () =>
  formSearch.classList.add("hide")
);
