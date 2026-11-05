class Solution:
    def minMoves(self, nums: list[int]) -> int:
        nums.sort()
        median = nums[len(nums) // 2]
        return sum(abs(x - median) for x in nums)

def run_tests():
    sol = Solution()
    assert sol.minMoves([1, 2, 3]) == 2 # target 2 -> |1-2| + |3-2| = 2
    assert sol.minMoves([1, 10, 2, 9]) == 16 # median is 9: |1-9| + |2-9| + |9-9| + |10-9| = 8 + 7 + 0 + 1 = 16
    assert sol.minMoves([5]) == 0
    print("All tests passed for 3736.")

if __name__ == "__main__":
    run_tests()