class Solution:
    def answerString(self, word: str, numFriends: int) -> str:
        if numFriends == 1:
            return word
        n = len(word)
        max_len = n - numFriends + 1
        return max(word[i:i + max_len] for i in range(n))
