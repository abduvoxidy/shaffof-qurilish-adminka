// Arifmetik amallar ketma-ketligi string ko’rinishida berilgan. Shu stringdagi ( va ) belgilari to’g’ri ishlatilgan bo’lsa true aks holda false qaytaruvchi funksiya yozing.
// Berilgan: “((2 + 3) + 5)”
// 	Natija: true

// 	Berilgan: “((4 + 7) - (5”
// 	Natija: false

function checkBracket(str = "") {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(") count += 1;
    else if (str[i] == ")") count -= 1;
  }
  return count == 0;
}

console.log(checkBracket(text));
