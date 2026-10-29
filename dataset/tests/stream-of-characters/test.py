import sys

class StreamChecker:
    def __init__(self, words: list[str]):
        self.trie = {}
        self.stream = []
        self.max_len = 0
        for w in words:
            self.max_len = max(self.max_len, len(w))
            node = self.trie
            for ch in reversed(w):
                node = node.setdefault(ch, {})
            node["$"] = True

    def query(self, letter: str) -> bool:
        self.stream.append(letter)
        if len(self.stream) > self.max_len:
            self.stream.pop(0)
        node = self.trie
        for ch in reversed(self.stream):
            if "$" in node:
                return True
            if ch not in node:
                return False
            node = node[ch]
        return "$" in node

sc = StreamChecker(["cd", "f", "kl"])
assert sc.query("a") == False
assert sc.query("b") == False
assert sc.query("c") == False
assert sc.query("d") == True
assert sc.query("e") == False
assert sc.query("f") == True
assert sc.query("g") == False
assert sc.query("h") == False
assert sc.query("i") == False
assert sc.query("j") == False
assert sc.query("k") == False
assert sc.query("l") == True
print("All tests passed successfully.")
