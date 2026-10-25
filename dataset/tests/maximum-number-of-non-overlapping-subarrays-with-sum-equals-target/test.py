class Solution:
    def maxNonOverlapping(self, nums: list[int], target: int) -> int:
        seen = {0}
        cur = 0
        ans = 0
        for x in nums:
            cur += x
            if cur - target in seen:
                ans += 1
                seen = {cur}
            else:
                seen.add(cur)
        return ans

def test():
    sol = Solution()
    assert sol.maxNonOverlapping([1,1,1,1,1], 2) == 2, "test 1 failed"
    assert sol.maxNonOverlapping([-1,3,5,1,4,2,-9], 6) == 2, "test 2 failed"
    print("✓ maximum-number-of-non-overlapping-subarrays-with-sum-equals-target passed")

if __name__ == "__main__":
    test()
