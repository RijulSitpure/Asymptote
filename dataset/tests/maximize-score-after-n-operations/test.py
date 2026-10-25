import math

class Solution:
    def maxScore(self, nums: list[int]) -> int:
        n = len(nums)
        memo = {}

        def dp(mask: int) -> int:
            if mask in memo:
                return memo[mask]
            k = bin(mask).count('1') // 2 + 1
            if k > n // 2:
                return 0

            res = 0
            for i in range(n):
                if not (mask & (1 << i)):
                    for j in range(i + 1, n):
                        if not (mask & (1 << j)):
                            next_mask = mask | (1 << i) | (1 << j)
                            gain = k * math.gcd(nums[i], nums[j])
                            res = max(res, gain + dp(next_mask))
            memo[mask] = res
            return res

        return dp(0)

def test():
    sol = Solution()
    assert sol.maxScore([1,2]) == 1
    assert sol.maxScore([3,4,6,8]) == 11
    assert sol.maxScore([1,2,3,4,5,6]) == 14

    print("✓ maximize-score-after-n-operations passed")

if __name__ == '__main__':
    test()
