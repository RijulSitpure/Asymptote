class Solution:
    def canMouseWin(self, grid: list[str], catJump: int, mouseJump: int) -> bool:
        R, C = len(grid), len(grid[0])
        food = cat = mouse = None
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 'F': food = (r, c)
                elif grid[r][c] == 'C': cat = (r, c)
                elif grid[r][c] == 'M': mouse = (r, c)
        MAX_TURNS = 128
        memo = {}
        dirs = [(-1,0), (1,0), (0,-1), (0,1)]
        def dp(turn, m_pos, c_pos):
            if turn >= MAX_TURNS: return False
            if m_pos == c_pos: return False
            if c_pos == food: return False
            if m_pos == food: return True
            state = (turn, m_pos, c_pos)
            if state in memo: return memo[state]
            mr, mc = m_pos
            cr, cc = c_pos
            if turn % 2 == 0:
                for dr, dc in [(0,0)] + dirs:
                    for j in range(1, mouseJump + 1 if dr or dc else 2):
                        nr, nc = mr + dr * j, mc + dc * j
                        if not (0 <= nr < R and 0 <= nc < C) or grid[nr][nc] == '#':
                            break
                        if dp(turn + 1, (nr, nc), c_pos):
                            memo[state] = True
                            return True
                memo[state] = False
                return False
            else:
                for dr, dc in [(0,0)] + dirs:
                    for j in range(1, catJump + 1 if dr or dc else 2):
                        nr, nc = cr + dr * j, cc + dc * j
                        if not (0 <= nr < R and 0 <= nc < C) or grid[nr][nc] == '#':
                            break
                        if not dp(turn + 1, m_pos, (nr, nc)):
                            memo[state] = False
                            return False
                memo[state] = True
                return True
        return dp(0, mouse, cat)

sol = Solution()
assert sol.canMouseWin(["####F","#C...","M...."], 1, 2) is True
assert sol.canMouseWin(["M.C...F"], 1, 4) is True
print("All tests passed successfully.")
