class SegmentTree {
  constructor(inputArray, binaryOperation, fallBackValue) {
    this.inputArray = inputArray;
    this.binaryOperation = binaryOperation; //binary operation of query i.e min or sum
    this.fallBackValue = fallBackValue; //fallback value (i.e. 0 for sum, Infinity for min)

    //we are trying to store segment tree in an array as it is an almost complete binary tree so we can use array, just like heap
    this.segmentTree = this.initializeSegmentTree();

    this.buildSegmentTree();
  }
  initializeSegmentTree() {
    let lengthOfSegmentTree;
    //if inputArray.length is a power of 2
    if (Number.isInteger(Math.log2(this.inputArray.length))) {
      lengthOfSegmentTree = 2 * this.inputArray.length - 1;
    } else {
      // If original array length is not a power of two then we need to find
      // next number that is a power of two and use it to calculate
      // tree array size. This is happens because we need to fill empty children
      // in perfect binary tree with nulls.And those nulls need extra space.
      lengthOfSegmentTree =
        2 * 2 ** (Math.floor(Math.log2(this.inputArray.length)) + 1) - 1;
    }
    return new Array(lengthOfSegmentTree).fill(null);
  }

  buildSegmentTree() {
    let _buildSegmentTreeRecursively = (
      inputLeftIndex,
      inputRightIndex,
      segmentTreeIndex
    ) => {
      if (inputLeftIndex > inputRightIndex) {
        return;
      }

      if (inputLeftIndex == inputRightIndex) {
        this.segmentTree[segmentTreeIndex] = this.inputArray[inputLeftIndex];
        return;
      }

      let middleInputIndex = Math.floor((inputLeftIndex + inputRightIndex) / 2);
      _buildSegmentTreeRecursively(
        inputLeftIndex,
        middleInputIndex,
        this.getLeftChildIndex(segmentTreeIndex)
      );
      _buildSegmentTreeRecursively(
        middleInputIndex + 1,
        inputRightIndex,
        this.getRightChildIndex(segmentTreeIndex)
      );

      this.segmentTree[segmentTreeIndex] = this.binaryOperation(
        this.segmentTree[this.getLeftChildIndex(segmentTreeIndex)],
        this.segmentTree[this.getRightChildIndex(segmentTreeIndex)]
      );
    };

    _buildSegmentTreeRecursively(0, this.inputArray.length - 1, 0);
  }

  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  rangeQuery(rangeStartIndex, rangeEndIndex) {
    let _rangeQueryRecursively = (
      inputStartIndex,
      inputEndIndex,
      segmentTreeIndex
    ) => {
      if (rangeStartIndex > inputEndIndex || rangeEndIndex < inputStartIndex) {
        //No overlap
        console.log("No Overlap", inputStartIndex, inputEndIndex);
        return this.fallBackValue;
      } else if (
        inputStartIndex >= rangeStartIndex &&
        inputEndIndex <= rangeEndIndex
      ) {
        //Total Overlap
        console.log("Total Overlap", inputStartIndex, inputEndIndex);
        return this.segmentTree[segmentTreeIndex];
      } else {
        //partial overlap
        console.log("Partial Overlap", inputStartIndex, inputEndIndex);
        let inputMiddleIndex = Math.floor(
          (inputStartIndex + inputEndIndex) / 2
        );
        return this.binaryOperation(
          _rangeQueryRecursively(
            inputStartIndex,
            inputMiddleIndex,
            this.getLeftChildIndex(segmentTreeIndex)
          ),
          _rangeQueryRecursively(
            inputMiddleIndex + 1,
            inputEndIndex,
            this.getRightChildIndex(segmentTreeIndex)
          )
        );
      }
    };

    return _rangeQueryRecursively(0, this.inputArray.length - 1, 0);
  }
}

let arr = [-1, 3, 2, 4, 0, 3, 6];
let ST = new SegmentTree(arr, (a, b) => (a < b ? a : b), Number.MAX_VALUE);
console.log(ST.segmentTree);
console.log(ST.rangeQuery(0, 3));
