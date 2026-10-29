import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'prefix-and-suffix-search.json')

class TrieNode:
    def __init__(self):
        self.children = {}
        self.weight = 0

class WordFilter:
    def __init__(self, words: list[str]):
        self.root = TrieNode()
        for weight, word in enumerate(words):
            word_len = len(word)
            for i in range(word_len + 1):
                wrapped = word[i:] + '{' + word
                curr = self.root
                curr.weight = weight
                for ch in wrapped:
                    if ch not in curr.children:
                        curr.children[ch] = TrieNode()
                    curr = curr.children[ch]
                    curr.weight = weight

    def f(self, pref: str, suff: str) -> int:
        curr = self.root
        target = suff + '{' + pref
        for ch in target:
            if ch not in curr.children:
                return -1
            curr = curr.children[ch]
        return curr.weight

wf = WordFilter(["apple"])
assert wf.f("a", "e") == 0
assert wf.f("b", "") == -1
print("✓ prefix-and-suffix-search passed")
