class Solution:
    def minOperations(self, nums: list[int]) -> int:
        from bisect import bisect_left
        # By Dilworth's theorem, min strictly increasing subsequences = length of longest non-increasing subsequence
        # Equivalently, length of longest non-decreasing subsequence on reversed array
        tails = []
        for x in reversed(nums):
            from bisect import bisect_right
            idx = bisect_right(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)
