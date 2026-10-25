class Solution:
    def maxSumRangeQuery(self, nums: list[int], requests: list[list[int]]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        diff = [0] * (n + 1)
        for l, r in requests:
            diff[l] += 1
            diff[r + 1] -= 1
        freq = [0] * n
        cur = 0
        for i in range(n):
            cur += diff[i]
            freq[i] = cur
        freq.sort()
        nums.sort()
        return sum(f * x for f, x in zip(freq, nums)) % MOD

def test():
    sol = Solution()
    assert sol.maxSumRangeQuery([1,2,3,4,5], [[1,3],[0,1]]) == 19, "test 1 failed"
    assert sol.maxSumRangeQuery([1,2,3,4,5,6], [[0,1]]) == 11, "test 2 failed"
    assert sol.maxSumRangeQuery([1,2,3,4,5,10], [[0,2],[1,3],[1,1]]) == 47, "test 3 failed"
    print("✓ maximum-sum-obtained-of-any-permutation passed")

if __name__ == "__main__":
    test()
