class Solution:
    def maxTotalSum(self, nums: list[int], limit: int, threshold: int) -> int:
        capped = [min(x, threshold) for x in nums if x > 0]
        capped.sort(reverse=True)
        return sum(capped[:limit])

def run_tests():
    sol = Solution()
    assert sol.maxTotalSum([10, 20, 5, 1], 2, 12) == 22
    assert sol.maxTotalSum([10, 20, 5, 1], 2, 15) == 25
    assert sol.maxTotalSum([1, 2, 3], 5, 10) == 6
    print("All tests passed for 3763.")

if __name__ == "__main__":
    run_tests()
