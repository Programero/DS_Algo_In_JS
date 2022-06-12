class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(str) {
    let currentNode = this.root;
    for (let i = 0; i < str.length; i++) {
      if (!currentNode.children[str[i]]) {
        currentNode.children[str[i]] = new TrieNode();
      }
      currentNode = currentNode.children[str[i]];
    }
    currentNode.isEndOfWord = true;
  }

  search(str) {
    let currentNode = this.root;
    for (let i = 0; i < str.length; i++) {
      console.log(currentNode);
      if (!currentNode.children[str[i]]) {
        return false;
      }
      currentNode = currentNode.children[str[i]];
    }
    return currentNode.isEndOfWord;
  }

  delete(str) {
    _deleteRecursively(this.root, str, 0);

    function _deleteRecursively(parentTrieNode, str, index) {
      const trieNode = parentTrieNode.children[str[index]];

      if (!trieNode) {
        return;
      }

      if (str.length - 1 == index) {
        //if it's the end of string
        //check if it's not the endOfWord
        if (!trieNode.isEndOfWord) {
          return;
        }

        trieNode.isEndOfWord = false;
      } else {
        _deleteRecursively(trieNode, str, index + 1);
      }

      //check if the trieNode.children has got no children, then delete that key from parentTrieNode delete parentTrieNode[str[index]]

      if (
        Object.keys(trieNode.children).length == 0 &&
        trieNode.isEndOfWord == false
      ) {
        //console.log("BEFORE deleting: ", parentTrieNode.children);
        delete parentTrieNode.children[str[index]];
        //console.log("After deleting", parentTrieNode.children);
      }
    }
  }
}

const myTrie = new Trie();
myTrie.insert("Kapil");
myTrie.insert("Thukral");
myTrie.insert("Kapila");
myTrie.delete("Kapila");
myTrie.delete("Kapil");
console.log(myTrie.search("Kapila"));
