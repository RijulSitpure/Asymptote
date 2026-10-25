import bisect

class Solution:
    def waysToSplit(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]
        total = pref[n]
        ans = 0

        for i in range(1, n - 1):
            left_sum = pref[i]
            if left_sum * 3 > total:
                break
            min_j = bisect.bisect_left(pref, 2 * left_sum, i + 1, n)
            max_j = bisect.bisect_right(pref, (total + left_sum) // 2, i + 1, n) - 1
            if min_j <= max_j:
                ans = (ans + (max_j - min_j + 1)) % MOD
        return ans

def test():
    sol = Solution()
    assert sol.waysToSplit([1,1,1]) == 1
    assert sol.waysToSplit([1,2,2,2,5,0]) == 3
    assert sol.waysToSplit([3,2,1]) == 0

    print("✓ ways-to-split-array-into-three-subarrays passed")

if __name__ == '__main__':
    test()
