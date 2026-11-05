
class Solution:
    def maxSum(self, grid: list[list[int]], limits: list[int], k: int) -> int:
        candidates = []
        for i, row in enumerate(grid):
            row.sort(reverse=True)
            candidates.extend(row[:limits[i]])
        candidates.sort(reverse=True)
        return sum(candidates[:k])

def test_maximum_sum_with_at_most_k_elements():
    sol = Solution()
    assert sol.maxSum([[1, 2], [3, 4]], [1, 2], 2) == 7
    assert sol.maxSum([[5, 3, 7], [8, 2, 6]], [2, 2], 3) == 21

if __name__ == '__main__':
    test_maximum_sum_with_at_most_k_elements()
    print('All tests passed.')
