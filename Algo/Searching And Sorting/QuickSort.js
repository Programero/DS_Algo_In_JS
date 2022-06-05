/**
 * @param {number[]} arr
 */

const QuickSort = (arr) => {
  sort(arr, 0, arr.length - 1);
};

const sort = (arr, start, end) => {
  if (start >= end) {
    return;
  }
  //select last element as the pivot element
  let pivotIndx = end;
  //Get pivot element at it's right place in O(n) such that all elements less than pivot element are at it's left and all elements greater than pivot element are at it's right.
  pivotIndx = getPivotInplace(arr, start, end, pivotIndx);
  //call Quick Sort on other two halves
  sort(arr, start, pivotIndx - 1);
  sort(arr, pivotIndx + 1, end);
};

const getPivotInplace = (arr, start, end, pivotIndx) => {
  let countElemLessThanPivot = start;
  for (let i = start; i < end; i++) {
    if (arr[i] <= arr[pivotIndx]) {
      //swap arr[i] with arr[countElemLessThanPivot]
      let temp = arr[i];
      arr[i] = arr[countElemLessThanPivot];
      arr[countElemLessThanPivot] = temp;
      //increment countElemLessThanPivot
      countElemLessThanPivot++;
    }
  }
  //swap arr[pivotIndx] with arr[countElemLessThanPivot]
  let temp = arr[pivotIndx];
  arr[pivotIndx] = arr[countElemLessThanPivot];
  arr[countElemLessThanPivot] = temp;

  return countElemLessThanPivot;
};

const arr = [0, 9, 4, 3, 4, 6, 1];
QuickSort(arr);
console.log(arr);
