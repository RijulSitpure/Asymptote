import bisect

class Solution:
    def minimumDifference(self, nums: list[int]) -> int:
        n = len(nums) // 2
        total = sum(nums)
        target = total // 2
        left_sums = [[] for _ in range(n + 1)]
        right_sums = [[] for _ in range(n + 1)]

        for mask in range(1 << n):
            sz = bin(mask).count('1')
            s_l = sum(nums[i] for i in range(n) if (mask >> i) & 1)
            left_sums[sz].append(s_l)
            s_r = sum(nums[n + i] for i in range(n) if (mask >> i) & 1)
            right_sums[sz].append(s_r)

        for sz in range(n + 1):
            right_sums[sz].sort()

        ans = float('inf')
        for k in range(n + 1):
            req = n - k
            r_list = right_sums[req]
            for sl in left_sums[k]:
                ideal = target - sl
                idx = bisect.bisect_left(r_list, ideal)
                if idx < len(r_list):
                    s1 = sl + r_list[idx]
                    s2 = total - s1
                    ans = min(ans, abs(s1 - s2))
                if idx > 0:
                    s1 = sl + r_list[idx - 1]
                    s2 = total - s1
                    ans = min(ans, abs(s1 - s2))
        return ans
