class Solution:
    def answerString(self, word: str, numFriends: int) -> str:
        if numFriends == 1:
            return word
        n = len(word)
        i, j, k = 0, 1, 0
        while j + k < n:
            d = ord(word[i + k]) - ord(word[j + k])
            if d == 0:
                k += 1
            elif d < 0:
                i += k + 1
                k = 0
                if i >= j:
                    j = i + 1
            else:
                j += k + 1
                k = 0
        s = word[i:]
        max_len = n - numFriends + 1
        return s[:min(len(s), max_len)]
