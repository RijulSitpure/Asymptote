class TrieNode:
    def __init__(self):
        self.children = {}
        self.word_count = 0
        self.prefix_count = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
            node.prefix_count += 1
        node.word_count += 1

    def countWordsEqualTo(self, word: str) -> int:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return 0
            node = node.children[ch]
        return node.word_count

    def countWordsStartingWith(self, prefix: str) -> int:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return 0
            node = node.children[ch]
        return node.prefix_count

    def erase(self, word: str) -> None:
        node = self.root
        for ch in word:
            node = node.children[ch]
            node.prefix_count -= 1
        node.word_count -= 1

def test_trie():
    trie = Trie()
    trie.insert("apple")
    trie.insert("apple")
    assert trie.countWordsEqualTo("apple") == 2
    assert trie.countWordsStartingWith("app") == 2
    trie.erase("apple")
    assert trie.countWordsEqualTo("apple") == 1
    assert trie.countWordsStartingWith("app") == 1
    trie.erase("apple")
    assert trie.countWordsEqualTo("apple") == 0

