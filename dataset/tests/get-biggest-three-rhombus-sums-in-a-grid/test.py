class Solution:
    def getBiggestThree(self, grid: list[list[int]]) -> list[int]:
        m, n = len(grid), len(grid[0])
        sums = set()

        for r in range(m):
            for c in range(n):
                sums.add(grid[r][c])
                k = 1
                while r - k >= 0 and r + k < m and c - k >= 0 and c + k < n:
                    total = 0
                    for i in range(k):
                        total += grid[r - k + i][c + i]
                        total += grid[r + i][c + k - i]
                        total += grid[r + k - i][c - i]
                        total += grid[r - i][c - k + i]
                    sums.add(total)
                    k += 1

        return sorted(sums, reverse=True)[:3]

def test():
    sol = Solution()
    g1 = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
    assert sol.getBiggestThree(g1) == [228,216,211]
    g2 = [[1,2,3],[4,5,6],[7,8,9]]
    assert sol.getBiggestThree(g2) == [20,9,8]
    g3 = [[7,7,7]]
    assert sol.getBiggestThree(g3) == [7]

if __name__ == '__main__':
    test()
