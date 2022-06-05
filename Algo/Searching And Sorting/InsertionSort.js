/**
 * @param {number[]} arr
 */

//sort the arr inplace
const insertionSort = (arr) => {
  //insertion sort
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        //swap arr[j] and arr[i]
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      } else {
        break;
      }
    }
  }
};

const arr = [1, 9, 4, 3, 4, 6, 0];
insertionSort(arr);
console.log(arr);
