//leetcode Problem link: https://leetcode.com/problems/binary-search/

//-------------Description----------------------------------
// Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to
//search target in nums. If target exists, then return its index. Otherwise, return -1.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  //nums is an array of sorted numbers search target in nums

  return mysearch(0, nums.length - 1, nums, target);
};

const mysearch = function (start, end, nums, target) {
  //find middle element index

  if (start > end) {
    return -1;
  }
  let middle = Math.floor((start + end) / 2);
  if (nums[middle] == target) {
    return middle;
  } else if (nums[middle] < target) {
    return mysearch(middle + 1, end, nums, target);
  } else {
    return mysearch(start, middle - 1, nums, target);
  }
};

let nums = [-1, 0, 3, 5, 9, 12];
let target = 9;
console.log(search(nums, target));
