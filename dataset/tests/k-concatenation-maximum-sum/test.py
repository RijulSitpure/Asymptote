class Solution:
    def kConcatenationMaxSum(self, arr: list[int], k: int) -> int:
        MOD = 10**9 + 7
        
        def kadane(nums):
            cur = max_so_far = 0
            for x in nums:
                cur = max(0, cur + x)
                max_so_far = max(max_so_far, cur)
            return max_so_far
        
        total = sum(arr)
        if k == 1:
            return kadane(arr) % MOD
        
        max_two = kadane(arr * 2)
        if total > 0:
            return (max_two + (k - 2) * total) % MOD
        return max_two % MOD

def test():
    sol = Solution()
    assert sol.kConcatenationMaxSum([1, 2], 3) == 9, "test 1 failed"
    assert sol.kConcatenationMaxSum([1, -2, 1], 5) == 2, "test 2 failed"
    assert sol.kConcatenationMaxSum([-1, -2], 7) == 0, "test 3 failed"
    print("✓ k-concatenation-maximum-sum passed")

if __name__ == "__main__":
    test()
