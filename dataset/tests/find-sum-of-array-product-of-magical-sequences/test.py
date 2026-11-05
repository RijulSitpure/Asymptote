from typing import List

class Solution:
    def magicalSum(self, m: int, k: int, nums: List[int]) -> int:
        MOD = 1_000_000_007
        comb = [[0] * (m + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            comb[i][0] = 1
            for j in range(1, i + 1):
                comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD

        memo = {}

        def dp(leftM: int, leftK: int, i: int, carry: int) -> int:
            bits = bin(carry).count("1")
            if leftM < 0 or leftK < 0 or (bits + leftM < leftK):
                return 0
            if leftM == 0:
                return 1 if leftK == bits else 0
            if i == len(nums):
                return 0
            state = (leftM, leftK, i, carry)
            if state in memo:
                return memo[state]

            res = 0
            for t in range(leftM + 1):
                ways = comb[leftM][t]
                prod = pow(nums[i], t, MOD)
                nCarry = (carry + t) >> 1
                nBits = (carry + t) & 1
                sub = dp(leftM - t, leftK - nBits, i + 1, nCarry)
                res = (res + ways * prod % MOD * sub) % MOD
            memo[state] = res
            return res

        return dp(m, k, 0, 0)

def run_tests():
    s = Solution()
    res = s.magicalSum(2, 1, [1, 2])
    assert res == 5, f"Expected 5, got {res}"
    print("3539 find-sum-of-array-product-of-magical-sequences PASSED")

if __name__ == "__main__":
    run_tests()
