class Solution:
    def mostWordsFound(self, sentences: list[str]) -> int:
        return max(s.count(' ') + 1 for s in sentences)
