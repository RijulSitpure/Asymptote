class Solution:
    def findPattern(self, stream, pattern: list[int]) -> int:
        m = len(pattern)
        pi = [0] * m
        j = 0
        for i in range(1, m):
            while j > 0 and pattern[i] != pattern[j]:
                j = pi[j - 1]
            if pattern[i] == pattern[j]:
                j += 1
            pi[i] = j
        idx = 0
        j = 0
        while True:
            bit = stream.next()
            while j > 0 and bit != pattern[j]:
                j = pi[j - 1]
            if bit == pattern[j]:
                j += 1
            if j == m:
                return idx - m + 1
            idx += 1
