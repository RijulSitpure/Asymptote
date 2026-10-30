class Solution:
    def equalDigitFrequency(self, s: str) -> int:
        n = len(s)
        seen = set()
        for i in range(n):
            count = [0] * 10
            distinct = 0
            max_f = 0
            for j in range(i, n):
                d = ord(s[j]) - ord('0')
                if count[d] == 0:
                    distinct += 1
                count[d] += 1
                if count[d] > max_f:
                    max_f = count[d]
                if distinct * max_f == (j - i + 1):
                    seen.add(s[i:j + 1])
        return len(seen)
