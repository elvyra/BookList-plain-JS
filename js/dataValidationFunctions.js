export function validISBN(ISBN) {
  // ISBN prasideda skaitmeniu, veliau bent vienas skaitmuo, taskas, skliaustelis ar bruksnelis
  let regex = /^[0-9]([0-9]|[\.\(\)\-])+$/;
  return ISBN.match(regex) ? true : false;
}

export function validYear(year) {
  // Spausdos presas israstas 1455 metais, einamieji - 2020
  let regex = /^(145[5-9]|1[5-9]\d\d|20[0-1]\d|2020)$/;
  return year.match(regex) ? true : false;
}

export function validTitle(title) {
  // Ne trumpesnis nei 2 simboliai
  let regex = /^[\w\.\(\)\-\s\:\/\;\,'\"\[\]\+\=ąčęėįšųūžĄČĘĖĮŠŲŪŽ]{2,}$/;
  return title.match(regex) ? true : false;
}

export function validPages(pages) {
  // Bent vienas skaitmuo
  let regex = /^[0-9]+$/;
  return pages.match(regex) ? true : false;
}
