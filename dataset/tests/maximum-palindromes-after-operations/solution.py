from collections import Counter

class Solution:
    def maxPalindromesAfterOperations(self, words: list[str]) -> int:
        cnt = Counter(''.join(words))
        pairs = sum(c // 2 for c in cnt.values())
        lengths = sorted(len(w) for w in words)
        ans = 0
        for l in lengths:
            need = l // 2
            if pairs >= need:
                pairs -= need
                ans += 1
            else:
                break
        return ans
