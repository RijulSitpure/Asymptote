from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def singleDivisorTriplet(self, nums: list[int]) -> int:
        from collections import Counter
        cnt = Counter(nums)
        ans = 0
        vals = sorted(cnt.keys())
        m = len(vals)
        for i in range(m):
            a = vals[i]
            for j in range(i, m):
                b = vals[j]
                for k in range(j, m):
                    c = vals[k]
                    s = a + b + c
                    divs = (s % a == 0) + (s % b == 0) + (s % c == 0)
                    if divs == 1:
                        if a == b == c:
                            ans += cnt[a] * (cnt[a] - 1) * (cnt[a] - 2)
                        elif a == b:
                            ans += cnt[a] * (cnt[a] - 1) * cnt[c] * 3
                        elif b == c:
                            ans += cnt[b] * (cnt[b] - 1) * cnt[a] * 3
                        else:
                            ans += cnt[a] * cnt[b] * cnt[c] * 6
        return ans
