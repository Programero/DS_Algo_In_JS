class DisjointSet {
  constructor() {
    this.items = {};
  }

  //@param {DisjointSetItem} item
  addItem(item) {
    this.items[item] = item;
  }
  union(value1, value2) {
    if (!this.items[value1] && !this.items[value1]) {
      throw new Error("DisjointSet Items missing for corresponding values");
    }
    let disjointSetItem1 = this.items[value1];
    let disjointSetItem2 = this.items[value2];
    let parent1Item = disjointSetItem1.find();
    let parent2Item = disjointSetItem2.find();

    if (parent1Item == parent2Item) {
      //both items belong to same equivalence classes
      return;
    }

    //check size of both the equivalence classes which is being stored in negative of (parent1Item.parent) and negative of (parent2Item.parent)
    if (-1 * parent1Item.parent > -1 * parent2Item.parent) {
      let newSize = parent1Item.parent + parent2Item.parent;
      parent2Item.parent = parent1Item;
      parent1Item.parent = newSize;
    } else {
      let newSize = parent1Item.parent + parent2Item.parent;
      parent1Item.parent = parent2Item;
      parent2Item.parent = newSize;
    }
  }
}

class DisjointSetItem {
  constructor(value) {
    this.value = value;
    this.parent = -1; //parent would store either a reference to parent DisjointSetItem or if it's a root then negative of size of it's set
    // this.children = {}
  }
  toString() {
    return this.value;
  }
  isRoot() {
    if (typeof this.parent == "number" && this.parent < 0) {
      return true;
    }

    return false;
  }
  find() {
    // console.log("in find:", this);
    if (this.isRoot()) {
      return this;
    }

    this.parent = this.find.call(this.parent); //using path compression

    return this.parent;
  }
}

let disjointSet = new DisjointSet();

let disjointSetItem1 = new DisjointSetItem(1);
disjointSet.addItem(disjointSetItem1);

let disjointSetItem2 = new DisjointSetItem(2);
disjointSet.addItem(disjointSetItem2);

let disjointSetItem3 = new DisjointSetItem(3);
disjointSet.addItem(disjointSetItem3);

let disjointSetItem4 = new DisjointSetItem(4);
disjointSet.addItem(disjointSetItem4);

let disjointSetItem5 = new DisjointSetItem(5);
disjointSet.addItem(disjointSetItem5);

console.log(disjointSet);
disjointSet.union(1, 2);
console.log(disjointSet);

disjointSet.union(3, 4);
console.log(disjointSet);

disjointSet.union(3, 5);
console.log(disjointSet);

disjointSet.union(1, 5);
console.log(disjointSet);

console.log("parent of 5: ", disjointSetItem5.find());
console.log("parent of 1: ", disjointSetItem1.find());
