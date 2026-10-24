import bisect
from typing import List

class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        m, n = len(matrix), len(matrix[0])
        if m < n:
            matrix = [list(col) for col in zip(*matrix)]
            m, n = n, m

        max_sum = float("-inf")
        for left in range(n):
            row_sums = [0] * m
            for right in range(left, n):
                for i in range(m):
                    row_sums[i] += matrix[i][right]

                curr_max = float("-inf")
                run = 0
                max_sub = float("-inf")
                for val in row_sums:
                    run = max(val, run + val)
                    max_sub = max(max_sub, run)
                if max_sub <= k:
                    max_sum = max(max_sum, max_sub)
                    if max_sum == k:
                        return k
                    continue

                sorted_prefixes = [0]
                prefix = 0
                for val in row_sums:
                    prefix += val
                    target = prefix - k
                    idx = bisect.bisect_left(sorted_prefixes, target)
                    if idx < len(sorted_prefixes):
                        max_sum = max(max_sum, prefix - sorted_prefixes[idx])
                        if max_sum == k:
                            return k
                    bisect.insort(sorted_prefixes, prefix)

        return max_sum

def test():
    sol = Solution()
    t1 = [[1,0,1],[0,-2,3]]
    assert sol.maxSumSubmatrix(t1, 2) == 2, "test 1 failed"
    t2 = [[2,2,-1]]
    assert sol.maxSumSubmatrix(t2, 3) == 3, "test 2 failed"
    print("✓ max-sum-of-rectangle-no-larger-than-k passed")

if __name__ == "__main__":
    test()
