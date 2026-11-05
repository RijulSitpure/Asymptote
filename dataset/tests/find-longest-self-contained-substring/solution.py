class Solution:
    def maxSubstringLength(self, s: str) -> int:
        first = {}
        last = {}
        for i, ch in enumerate(s):
            if ch not in first:
                first[ch] = i
            last[ch] = i

        n = len(s)
        ans = -1

        for ch in first:
            i = first[ch]
            max_last = last[ch]
            for j in range(i, n):
                c = s[j]
                if first[c] < i:
                    break
                if last[c] > max_last:
                    max_last = last[c]
                if j == max_last:
                    if not (i == 0 and j == n - 1):
                        if j - i + 1 > ans:
                            ans = j - i + 1
        return ans
