import collections

class Solution:
    def minSteps(self, s: str, t: str) -> int:
        c1 = collections.Counter(s)
        c2 = collections.Counter(t)
        ans = 0
        for ch in "abcdefghijklmnopqrstuvwxyz":
            ans += abs(c1[ch] - c2[ch])
        return ans
