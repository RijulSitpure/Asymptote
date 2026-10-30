class Solution:
    def isCircularSentence(self, sentence: str) -> bool:
        if sentence[0] != sentence[-1]:
            return False
        n = len(sentence)
        for i in range(n):
            if sentence[i] == ' ' and sentence[i - 1] != sentence[i + 1]:
                return False
        return True
