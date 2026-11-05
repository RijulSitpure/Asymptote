class Solution:
    def minAnagramLength(self, s: str) -> int:
        n = len(s)
        for k in range(1, n + 1):
            if n % k != 0:
                continue
            base = [0] * 26
            for i in range(k):
                base[ord(s[i]) - ord('a')] += 1
            valid = True
            for start in range(k, n, k):
                cur = [0] * 26
                for i in range(start, start + k):
                    cur[ord(s[i]) - ord('a')] += 1
                if cur != base:
                    valid = False
                    break
            if valid:
                return k
        return n
