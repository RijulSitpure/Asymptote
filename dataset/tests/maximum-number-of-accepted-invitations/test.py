class Solution:
    def maximumInvitations(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        match = [-1] * n

        def dfs(u: int, seen: list[bool]) -> bool:
            for v in range(n):
                if grid[u][v] and not seen[v]:
                    seen[v] = True
                    if match[v] == -1 or dfs(match[v], seen):
                        match[v] = u
                        return True
            return False

        ans = 0
        for i in range(m):
            seen = [False] * n
            if dfs(i, seen):
                ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.maximumInvitations([[1,1,1],[1,0,1],[0,0,1]]) == 3
    assert sol.maximumInvitations([[1,0,1,0],[1,0,0,0],[0,0,1,0],[1,1,1,0]]) == 3

if __name__ == '__main__':
    test()
