/**
 * @param {number[]} arr
 */

//sort the arr inplace
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let smallestEleIndx = i;
    for (j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        smallestEleIndx = j;
      }
    }
    //swap arr[i] and arr[smallestEleIndx]
    let temp = arr[i];
    arr[i] = arr[smallestEleIndx];
    arr[smallestEleIndx] = temp;
  }
};

const arr = [1, 9, 4, 3, 4, 6, 0];
selectionSort(arr);
console.log(arr);
