class Solution:
    def minimumTimeToInitialState(self, word: str, k: int) -> int:
        n = len(word)
        t = 1
        while t * k < n:
            if word[t * k:] == word[:n - t * k]:
                return t
            t += 1
        return (n + k - 1) // k
