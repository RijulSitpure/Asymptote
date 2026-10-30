class Solution:
    def maxMatrixSum(self, matrix: list[list[int]]) -> int:
        total_sum = 0
        neg_count = 0
        min_abs = float("inf")
        
        for row in matrix:
            for val in row:
                if val < 0:
                    neg_count += 1
                abs_v = abs(val)
                total_sum += abs_v
                min_abs = min(min_abs, abs_v)
                
        if neg_count % 2 == 1:
            total_sum -= 2 * min_abs
        return total_sum

def test_max_matrix_sum():
    sol = Solution()
    assert sol.maxMatrixSum([[1, -1], [-1, 1]]) == 4
    assert sol.maxMatrixSum([[1, 2, 3], [-1, -2, -3], [1, 2, 3]]) == 16

