class Solution:
    def findBall(self, grid: list[list[int]]) -> list[int]:
        m, n = len(grid), len(grid[0])
        ans = []
        for col in range(n):
            curr = col
            for r in range(m):
                d = grid[r][curr]
                nxt = curr + d
                if nxt < 0 or nxt >= n or grid[r][nxt] != d:
                    curr = -1
                    break
                curr = nxt
            ans.append(curr)
        return ans

def test():
    sol = Solution()
    assert sol.findBall([[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]) == [1,-1,-1,-1,-1]
    assert sol.findBall([[-1]]) == [-1]
    assert sol.findBall([[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]) == [0,1,2,3,4,-1]

    print("✓ where-will-the-ball-fall passed")

if __name__ == '__main__':
    test()
