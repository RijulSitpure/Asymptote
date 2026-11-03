from collections import Counter

class Solution:
    def maximumLength(self, nums: list[int]) -> int:
        cnt = Counter(nums)
        ans = cnt[1] - (cnt[1] % 2 ^ 1) if cnt[1] > 0 else 0
        if 1 in cnt:
            del cnt[1]
        for x in sorted(cnt.keys()):
            t = 0
            cur = x
            while cnt[cur] > 1:
                cur = cur * cur
                t += 2
            t += 1 if cnt[cur] > 0 else -1
            ans = max(ans, t)
        return max(ans, 1)
