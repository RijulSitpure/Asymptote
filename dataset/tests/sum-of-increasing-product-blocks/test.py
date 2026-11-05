class Solution:
    def sumOfProductBlocks(self, m: int) -> int:
        MOD = 1_000_000_007
        total_sum = 0
        cur = 1
        for k in range(1, m + 1):
            block_prod = 1
            for _ in range(k):
                block_prod = (block_prod * cur) % MOD
                cur += 1
            total_sum = (total_sum + block_prod) % MOD
        return total_sum

def run_tests():
    sol = Solution()
    # Block 1: [1] -> prod = 1
    # Block 2: [2, 3] -> prod = 6
    # Sum for m=2 is 1 + 6 = 7
    assert sol.sumOfProductBlocks(2) == 7
    # Block 3: [4, 5, 6] -> prod = 120
    # Sum for m=3 is 7 + 120 = 127
    assert sol.sumOfProductBlocks(3) == 127
    print("All tests passed for 3792.")

if __name__ == "__main__":
    run_tests()
