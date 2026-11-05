class TrieNode:
    def __init__(self):
        self.children = {}
        self.best_idx = -1

class Solution:
    def stringIndices(self, wordsContainer: list[str], wordsQuery: list[str]) -> list[int]:
        root = TrieNode()
        
        def is_better(new_idx, old_idx):
            if old_idx == -1:
                return True
            len_new, len_old = len(wordsContainer[new_idx]), len(wordsContainer[old_idx])
            if len_new != len_old:
                return len_new < len_old
            return new_idx < old_idx

        # Global best for empty match
        for idx in range(len(wordsContainer)):
            if is_better(idx, root.best_idx):
                root.best_idx = idx

        for idx, word in enumerate(wordsContainer):
            curr = root
            for ch in reversed(word):
                if ch not in curr.children:
                    curr.children[ch] = TrieNode()
                curr = curr.children[ch]
                if is_better(idx, curr.best_idx):
                    curr.best_idx = idx

        ans = []
        for query in wordsQuery:
            curr = root
            for ch in reversed(query):
                if ch in curr.children:
                    curr = curr.children[ch]
                else:
                    break
            ans.append(curr.best_idx)
        return ans
