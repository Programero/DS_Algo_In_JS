function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

function BST() {
  this.root = null;
}

BST.prototype.insert = function (data) {
  if (!this.root) {
    this.root = new Node(data);
    return;
  }

  let currentNode = this.root;
  while (currentNode) {
    if (currentNode.data < data) {
      if (currentNode.right) {
        currentNode = currentNode.right;
      } else {
        currentNode.right = new Node(data);
        break;
      }
    } else {
      if (currentNode.left) {
        currentNode = currentNode.left;
      } else {
        currentNode.left = new Node(data);
        break;
      }
    }
  }
};

BST.prototype.PreOrderTravsersal = function () {
  PreOrderTravsersalHelper(this.root);

  function PreOrderTravsersalHelper(Node) {
    if (!Node) {
      return;
    }
    console.log(Node.data);

    if (Node.left) {
      PreOrderTravsersalHelper(Node.left);
    }
    if (Node.right) {
      PreOrderTravsersalHelper(Node.right);
    }
  }
};

BST.prototype.InOrderTravsersal = function () {
  InOrderTravsersalHelper(this.root);

  function InOrderTravsersalHelper(Node) {
    if (!Node) {
      return;
    }

    if (Node.left) {
      InOrderTravsersalHelper(Node.left);
    }
    console.log(Node.data);
    if (Node.right) {
      InOrderTravsersalHelper(Node.right);
    }
  }
};

BST.prototype.levelOrderTraversal = function () {
  const queue = [];
  queue.push(this.root);

  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node.data);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
};

let newBST = new BST();
newBST.insert(40);
newBST.insert(10);
newBST.insert(50);
newBST.insert(45);
//console.log(newBST.root);
console.log("Inorder Traversal");
newBST.InOrderTravsersal();
console.log("Levelorder Traversal");
newBST.levelOrderTraversal();
