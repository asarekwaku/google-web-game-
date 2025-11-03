// Trie data structure for efficient dictionary lookups
class Trie {
  constructor() {
    this.root = {};
    this.isEndOfWord = false;
  }

  // Insert a word into the trie
  insert(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    node.isEndOfWord = true;
  }

  // Search for a complete word in the trie
  search(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    return node.isEndOfWord === true;
  }

  // Check if any word in the trie starts with the given prefix
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix.toLowerCase()) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    return true;
  }
}

export default Trie;

