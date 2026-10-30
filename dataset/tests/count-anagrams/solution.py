import math
from collections import Counter

class Solution:
    def countAnagrams(self, s: str) -> int:
        MOD = 10**9 + 7
        words = s.split(' ')
        ans = 1
        for w in words:
            counts = Counter(w)
            num = math.factorial(len(w))
            den = 1
            for c in counts.values():
                den = (den * math.factorial(c)) % MOD
            ans = (ans * num * pow(den, MOD - 2, MOD)) % MOD
        return ans
