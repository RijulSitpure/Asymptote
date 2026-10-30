from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumBeauty(self, flowers: list[int], newFlowers: int, target: int, full: int, partial: int) -> int:
        flowers = [min(f, target) for f in flowers]
        flowers.sort()
        n = len(flowers)
        if flowers[0] >= target:
            return n * full
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + flowers[i]
        ans = 0
        j = 0
        for i in range(n + 1):
            needed_full = (n - i) * target - (pref[n] - pref[i])
            if needed_full > newFlowers:
                continue
            rem = newFlowers - needed_full
            if i == 0:
                ans = max(ans, (n - i) * full)
                continue
            while j < i and flowers[j] * j - pref[j] <= rem:
                j += 1
            idx = min(j - 1, i - 1)
            rem_after = rem - (flowers[idx] * (idx + 1) - pref[idx + 1])
            min_val = min(target - 1, flowers[idx] + rem_after // (idx + 1))
            ans = max(ans, (n - i) * full + min_val * partial)
        return ans
