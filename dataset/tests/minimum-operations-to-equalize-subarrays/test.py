class Solution:
    def minOperationsToEqualize(self, nums: list[int], k: int) -> int:
        n = len(nums)
        ans = float('inf')
        for i in range(n - k + 1):
            window = sorted(nums[i:i + k])
            med = window[k // 2]
            cost = sum(abs(x - med) for x in window)
            ans = min(ans, cost)
        return ans

def run_tests():
    sol = Solution()
    assert sol.minOperationsToEqualize([1, 2, 3, 4], 3) == 2
    assert sol.minOperationsToEqualize([5, 5, 5], 3) == 0
    assert sol.minOperationsToEqualize([1, 10, 2, 9], 2) == 7
    print("All tests passed for 3762.")

if __name__ == "__main__":
    run_tests()
