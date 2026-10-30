import collections
import math
from typing import List

class Solution:
    def countPairs(self, nums: List[int], k: int) -> int:
        gcd_cnt = collections.Counter(math.gcd(x, k) for x in nums)
        keys = list(gcd_cnt.keys())
        ans = 0
        for i in range(len(keys)):
            d1 = keys[i]
            cnt1 = gcd_cnt[d1]
            if (d1 * d1) % k == 0:
                ans += cnt1 * (cnt1 - 1) // 2
            for j in range(i + 1, len(keys)):
                d2 = keys[j]
                cnt2 = gcd_cnt[d2]
                if (d1 * d2) % k == 0:
                    ans += cnt1 * cnt2
        return ans
