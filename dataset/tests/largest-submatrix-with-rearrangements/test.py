class Solution:
    def largestSubmatrix(self, matrix: list[list[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        heights = [0] * n
        ans = 0
        for r in range(m):
            for c in range(n):
                if matrix[r][c] == 1:
                    heights[c] += 1
                else:
                    heights[c] = 0
            sorted_h = sorted(heights, reverse=True)
            for i, h in enumerate(sorted_h):
                ans = max(ans, h * (i + 1))
        return ans

def test():
    sol = Solution()
    assert sol.largestSubmatrix([[0,0,1],[1,1,1],[1,0,1]]) == 4
    assert sol.largestSubmatrix([[1,0,1,0,1]]) == 3
    assert sol.largestSubmatrix([[1,1,0],[1,0,1]]) == 2

    print("✓ largest-submatrix-with-rearrangements passed")

if __name__ == '__main__':
    test()
