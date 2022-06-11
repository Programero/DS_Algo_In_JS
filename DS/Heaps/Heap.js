class Heap {
  constructor(comparisonFuntion) {
    this.heapContainer = [];
    this.comparisonFunction = comparisonFuntion;
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  percolateUp(index) {
    while (index != 0) {
      let parentIndex = this.getParentIndex(index);
      if (!this.comparisonFunction(parentIndex, index)) {
        this.swap(parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  percolateDown(index) {
    //run while loop till we have either left child or right child
    while (
      this.getLeftChildIndex(index) < this.heapContainer.length ||
      this.getRightChildIndex(index) < this.heapContainer.length
    ) {
      let leftChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);

      let hasLeftChild = leftChildIndex < this.heapContainer.length;
      let hasRightChild = rightChildIndex < this.heapContainer.length;

      //if both the child are out of order
      if (
        hasLeftChild &&
        !this.comparisonFunction(index, leftChildIndex) &&
        hasRightChild &&
        !this.comparisonFunction(index, rightChildIndex)
      ) {
        //choose one child to swap with index
        //compare leftchild and rightchild
        if (this.comparisonFunction(leftChildIndex, rightChildIndex)) {
          //case when leftchild is selected for swap with index
          this.swap(index, leftChildIndex);
          index = leftChildIndex;
        } else {
          this.swap(index, rightChildIndex);
          index = rightChildIndex;
        }
      }

      //else if only left child is out of order
      else if (
        hasLeftChild &&
        !this.comparisonFunction(index, leftChildIndex)
      ) {
        this.swap(index, leftChildIndex);
        index = leftChildIndex;
      }

      //else if only right child is out of order
      else if (
        hasRightChild &&
        !this.comparisonFunction(index, rightChildIndex)
      ) {
        this.swap(index, rightChildIndex);
        index = rightChildIndex;
      } else {
        break;
      }
    }
  }

  addElement(ele) {
    this.heapContainer.push(ele);
    this.percolateUp(this.heapContainer.length - 1);
  }

  deleteTop() {
    let topElement = this.heapContainer[0];
    this.swap(0, this.heapContainer.length - 1);
    this.heapContainer.splice(this.heapContainer.length - 1, 1);
    this.percolateDown(0);
    return topElement;
  }
}

const maxHeapComparisonFunction = function (parentIndex, childIndex) {
  return this.heapContainer[parentIndex] >= this.heapContainer[childIndex];
};

const minHeapComparisonFunction = function (parentIndex, childIndex) {
  return this.heapContainer[parentIndex] <= this.heapContainer[childIndex];
};

const maxHeap = new Heap(maxHeapComparisonFunction);
maxHeap.addElement(22);
console.log(maxHeap);
maxHeap.addElement(32);
console.log(maxHeap);
maxHeap.addElement(42);
console.log(maxHeap);
maxHeap.addElement(53);
console.log(maxHeap);
maxHeap.addElement(63);
console.log(maxHeap);
console.log(maxHeap.deleteTop());
console.log(maxHeap);
