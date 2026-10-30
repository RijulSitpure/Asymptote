class Solution:
    def appendCharacters(self, s: str, t: str) -> int:
        j = 0
        len_t = len(t)
        for c in s:
            if j < len_t and c == t[j]:
                j += 1
        return len_t - j
