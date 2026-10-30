class Solution:
    def addMinimum(self, word: str) -> int:
        k = 1
        for i in range(1, len(word)):
            if word[i] <= word[i - 1]:
                k += 1
        return 3 * k - len(word)
