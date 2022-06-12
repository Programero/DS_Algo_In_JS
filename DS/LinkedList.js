//define class Node
function Node(data) {
  this.data = data;
  this.next = null;
}

//defining a singly linked list
function LinkedList() {
  this.head = null;
  this.size = 0;
}

LinkedList.prototype.prepend = function (data) {
  //create a new Node
  let newNode = new Node(data);
  if (this.head === null) {
    this.head = newNode;
  } else {
    let tempHead = this.head;
    this.head = newNode;
    newNode.next = tempHead;
  }

  this.size++;
};

LinkedList.prototype.append = function (data) {
  let newNode = new Node(data);
  if (this.head === null) {
    this.head = newNode;
  } else {
    //traverse till the end of the node
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    //now currentnode is the last node
    currentNode.next = newNode;
  }

  this.size++;
};

LinkedList.prototype.traverse = function () {
  let currentNode = this.head;
  while (currentNode) {
    console.log(currentNode.data);
    currentNode = currentNode.next;
  }
};

LinkedList.prototype.reverse = function () {
  if (!this.head) {
    return;
  }
  let prevNode = this.head;
  let currentNode = prevNode.next;
  while (currentNode) {
    let nextNode = currentNode.next;
    currentNode.next = prevNode;
    prevNode = currentNode;
    currentNode = nextNode;
  }
  this.head.next = null; //as now head is the last node, make it's next point to null
  this.head = prevNode;
};

let aLinkList = new LinkedList();
aLinkList.append(1);
aLinkList.append(10);
aLinkList.append(100);
aLinkList.traverse();
aLinkList.reverse();
aLinkList.traverse();
