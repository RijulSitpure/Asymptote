class Solution:
    def kthLargestValue(self, matrix: list[list[int]], k: int) -> int:
        m, n = len(matrix), len(matrix[0])
        val = [[0] * (n + 1) for _ in range(m + 1)]
        values = []
        for r in range(m):
            for c in range(n):
                val[r + 1][c + 1] = val[r][c + 1] ^ val[r + 1][c] ^ val[r][c] ^ matrix[r][c]
                values.append(val[r + 1][c + 1])
        values.sort(reverse=True)
        return values[k - 1]

def test():
    sol = Solution()
    assert sol.kthLargestValue([[5,2],[1,6]], 1) == 7
    assert sol.kthLargestValue([[5,2],[1,6]], 2) == 5
    assert sol.kthLargestValue([[5,2],[1,6]], 3) == 4
    assert sol.kthLargestValue([[5,2],[1,6]], 4) == 0

    print("✓ find-kth-largest-xor-coordinate-value passed")

if __name__ == '__main__':
    test()
