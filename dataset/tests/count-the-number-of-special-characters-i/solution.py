class Solution:
    def numberOfSpecialChars(self, word: str) -> int:
        lowers = set(c for c in word if c.islower())
        uppers = set(c.lower() for c in word if c.isupper())
        return len(lowers & uppers)
