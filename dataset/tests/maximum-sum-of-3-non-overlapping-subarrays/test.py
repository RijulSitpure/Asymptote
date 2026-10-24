from typing import List

class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        W = []
        curr = sum(nums[:k])
        W.append(curr)
        for i in range(k, n):
            curr += nums[i] - nums[i - k]
            W.append(curr)

        m = len(W)
        left = [0] * m
        best = 0
        for i in range(m):
            if W[i] > W[best]:
                best = i
            left[i] = best

        right = [0] * m
        best = m - 1
        for i in range(m - 1, -1, -1):
            if W[i] >= W[best]:
                best = i
            right[i] = best

        max_total = 0
        ans = []
        for mid in range(k, m - k):
            l, r = left[mid - k], right[mid + k]
            total = W[l] + W[mid] + W[r]
            if total > max_total:
                max_total = total
                ans = [l, mid, r]
        return ans

def test():
    sol = Solution()
    assert sol.maxSumOfThreeSubarrays([1, 2, 1, 2, 6, 7, 5, 1], 2) == [0, 3, 5], "test 1 failed"
    assert sol.maxSumOfThreeSubarrays([1, 2, 1, 2, 1, 2, 1, 2, 1], 2) == [0, 2, 4], "test 2 failed"
    print("✓ maximum-sum-of-3-non-overlapping-subarrays passed")

if __name__ == "__main__":
    test()
