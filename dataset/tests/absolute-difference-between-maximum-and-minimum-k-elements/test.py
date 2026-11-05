class Solution:
    def differenceOfSums(self, nums: list[int], k: int) -> int:
        nums.sort()
        min_k_sum = sum(nums[:k])
        max_k_sum = sum(nums[-k:])
        return abs(max_k_sum - min_k_sum)

def run_tests():
    sol = Solution()
    assert sol.differenceOfSums([1, 5, 3, 2, 4], 2) == 6 # (5+4) - (1+2) = 9 - 3 = 6
    assert sol.differenceOfSums([10, 10, 10], 1) == 0
    print("All tests passed for 3774.")

if __name__ == "__main__":
    run_tests()
