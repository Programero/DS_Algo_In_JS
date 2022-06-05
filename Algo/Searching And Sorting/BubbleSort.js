/**
 * @param {number[]} arr
 */

//sort the arr inplace
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        //swap arr[j] and arr[j+1]
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
};

const arr = [1, 9, 4, 3, 4, 6, 0];
bubbleSort(arr);
console.log(arr);
