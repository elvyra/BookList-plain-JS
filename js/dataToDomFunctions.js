//----------------------------------------------------
// Lists all categories in catalog into ul element categoriesList
//----------------------------------------------------
export function listCategoriesForMenu(categories, categoriesList) {
  categories.map((category) => {
    let li = document.createElement("li");
    li.classList.add("nav-item", "category");
    li.setAttribute("value", category);
    li.textContent = category;
    categoriesList.appendChild(li);
  });
  categoriesList.firstChild.classList.add("active");
}

//----------------------------------------------------
// Lists all Books in given category to table booksList
//----------------------------------------------------
export function listBooksForTable(listOfBooks, booksList) {
  booksList.innerHTML = "";
  // Create table content
  for (let book of listOfBooks) {
    let row = booksList.insertRow(-1);
    let attrCount = 0;
    for (let attr in book) {
      let cell = row.insertCell(attrCount++);
      let text = document.createTextNode(book[attr]);
      cell.appendChild(text);
    }
  }

  // Create table header
  let book = listOfBooks[0];
  let thead = booksList.createTHead();
  let row = thead.insertRow(-1);
  let attrCount = 0;
  for (let attr in book) {
    let cell = row.insertCell(attrCount++);
    let text = document.createTextNode(attr);
    cell.appendChild(text);
  }
}

//----------------------------------------------------
// Lists all categories in catalog into select element options
//----------------------------------------------------
export function listCategoriesForSelect(categories, select) {
  select.innerHTML = `<option selected disabled value="choose">Pasirinkite kategoriją</option>`;
  categories.map((category) => {
    let option = document.createElement("option");
    option.textContent = category;
    option.value = category;
    select.appendChild(option);
  });
}

//----------------------------------------------------
// Show error message
//----------------------------------------------------
export function errorMessage(text, error) {
  error.classList.remove("hide");
  error.innerHTML = text;
  setTimeout(function () {
    error.innerHTML = "";
    error.classList.add("hide");
  }, 3000);
  alert(text);
}
