class Solution:
    def maxAlternatingSumOfSquares(self, nums: list[int]) -> int:
        # Choose order of nums to maximize alternating sum: x0^2 - x1^2 + x2^2 - x3^2 ...
        # Number of positive terms: ceil(n / 2)
        # Number of negative terms: floor(n / 2)
        # Assign largest values to positive terms, smallest values to negative terms
        sorted_nums = sorted(nums, reverse=True)
        n = len(nums)
        pos_count = (n + 1) // 2
        pos_terms = sorted_nums[:pos_count]
        neg_terms = sorted_nums[pos_count:]
        return sum(x * x for x in pos_terms) - sum(y * y for y in neg_terms)

def run_tests():
    sol = Solution()
    # nums = [1, 2, 3] -> 2 positive, 1 negative -> 3^2 + 2^2 - 1^2 = 9 + 4 - 1 = 12
    assert sol.maxAlternatingSumOfSquares([1, 2, 3]) == 12
    # nums = [4, 2] -> 1 positive, 1 negative -> 4^2 - 2^2 = 16 - 4 = 12
    assert sol.maxAlternatingSumOfSquares([4, 2]) == 12
    assert sol.maxAlternatingSumOfSquares([5]) == 25
    print("All tests passed for 3727.")

if __name__ == "__main__":
    run_tests()