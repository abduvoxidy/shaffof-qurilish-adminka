// Raqamlardan iborat massiv berilgan. Massivda har bir raqam necha martadan takrorlanganini hisoblovchi funksiya yozing
// Berilgan: [7,8,9,5,7,8,9,5,9,8,7,4,5,8,9]
// Natija:
// 	7 soni 3ta
// 	8 soni 4ta
// 	9 soni 4ta
// 	5 soni 3ta
// 	4 soni 1ta

// 1-usul

const arr = [7, 8, 9, 5, 7, 8, 9, 5, 9, 8, 7, 4, 5, 8, 9];
function findCount(arr) {
  let obj = arr.reduce((object, value) => {
    object[value] = ++object[value] || 1;
    return object;
  }, {});

  for (let key in obj) {
    console.log(`${key} dan ${obj[key]} ta`);
  }
}
findCount(arr);

// 2-usul

function findCount2(array) {
  const elementCount = {};
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    if (elementCount[element]) {
      elementCount[element] += 1;
    } else {
      elementCount[element] = 1;
    }
  }

  for (let key in elementCount) {
    console.log(`${key} dan ${elementCount[key]} ta`);
  }
}
findCount2(array);
