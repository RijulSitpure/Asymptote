class Solution:
    def rangeSum(self, nums: list[int], n: int, left: int, right: int) -> int:
        MOD = 10**9 + 7
        sums = []
        for i in range(n):
            cur = 0
            for j in range(i, n):
                cur += nums[j]
                sums.append(cur)
        sums.sort()
        return sum(sums[left - 1:right]) % MOD

def test():
    sol = Solution()
    assert sol.rangeSum([1,2,3,4], 4, 1, 5) == 13, "test 1 failed"
    assert sol.rangeSum([1,2,3,4], 4, 3, 4) == 6, "test 2 failed"
    assert sol.rangeSum([1,2,3,4], 4, 1, 10) == 50, "test 3 failed"
    print("✓ range-sum-of-sorted-subarray-sums passed")

if __name__ == "__main__":
    test()
