class Solution:
    def minOperations(self, nums: list[int], queries: list[int]) -> list[int]:
        import bisect
        nums.sort()
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]
        ans = []
        for q in queries:
            idx = bisect.bisect_left(nums, q)
            left_cost = idx * q - pref[idx]
            right_cost = (pref[n] - pref[idx]) - (n - idx) * q
            ans.append(left_cost + right_cost)
        return ans
