/**
 * @param {number[]} arr
 */

//sort the arr inplace
const MergeSort = (arr) => {
  //insertion sort
  sort(arr, 0, arr.length - 1);
};

const sort = (arr, start, end) => {
  if (start >= end) {
    return;
  }

  let middle = Math.floor((start + end) / 2);

  sort(arr, middle + 1, end);
  sort(arr, start, middle);

  merge(arr, start, middle, end);
};

const merge = (arr, start, middle, end) => {
  let newArr = [];
  let i = start;
  let j = middle + 1;
  while (i <= middle && j <= end) {
    if (arr[i] < arr[j]) {
      newArr.push(arr[i]);
      i++;
    } else {
      newArr.push(arr[j]);
      j++;
    }
  }

  while (j <= end) {
    newArr.push(arr[j]);
    j++;
  }
  while (i <= middle) {
    newArr.push(arr[i]);
    i++;
  }

  //now copy newarr to arr
  let i2 = start;
  let j2 = 0;
  for (; i2 <= end; i2++) {
    arr[i2] = newArr[j2];
    j2++;
  }
};

const arr = [1, 9, 4, 3, 4, 6, 0];
MergeSort(arr);
console.log(arr);
