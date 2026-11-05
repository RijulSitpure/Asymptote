class Solution:
    def minPrefixRemoval(self, nums: list[int]) -> int:
        n = len(nums)
        i = n - 1
        while i > 0 and nums[i - 1] < nums[i]:
            i -= 1
        return i

def run_tests():
    sol = Solution()
    assert sol.minPrefixRemoval([4, 5, 1, 2, 3]) == 2 # remove [4, 5], leaving [1, 2, 3]
    assert sol.minPrefixRemoval([1, 2, 3]) == 0
    assert sol.minPrefixRemoval([3, 2, 1]) == 2 # leaving [1]
    print("All tests passed for 3818.")

if __name__ == "__main__":
    run_tests()
