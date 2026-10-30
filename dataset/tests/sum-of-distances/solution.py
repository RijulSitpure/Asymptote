class Solution:
    def distance(self, nums: list[int]) -> list[int]:
        from collections import defaultdict
        groups = defaultdict(list)
        for i, x in enumerate(nums):
            groups[x].append(i)
        ans = [0] * len(nums)
        for indices in groups.values():
            m = len(indices)
            if m == 1:
                continue
            pref = [0] * (m + 1)
            for i in range(m):
                pref[i + 1] = pref[i] + indices[i]
            for r in range(m):
                idx = indices[r]
                left = r * idx - pref[r]
                right = (pref[m] - pref[r + 1]) - (m - 1 - r) * idx
                ans[idx] = left + right
        return ans
