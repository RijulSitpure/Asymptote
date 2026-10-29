from collections import deque

class Solution:
    def minPushBox(self, grid: list[list[str]]) -> int:
        R, C = len(grid), len(grid[0])
        for r in range(R):
            for c in range(C):
                if grid[r][c] == "B":
                    box = (r, c)
                elif grid[r][c] == "S":
                    player = (r, c)
                elif grid[r][c] == "T":
                    target = (r, c)

        def can_reach(start, dest, b_pos):
            if start == dest: return True
            q = deque([start])
            seen = {start, b_pos}
            while q:
                cr, cc = q.popleft()
                if (cr, cc) == dest: return True
                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                    nr, nc = cr + dr, cc + dc
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != "#" and (nr, nc) not in seen:
                        seen.add((nr, nc))
                        q.append((nr, nc))
            return False

        q = deque([(0, box[0], box[1], player[0], player[1])])
        visited = {(box[0], box[1], player[0], player[1])}

        while q:
            pushes, br, bc, pr, pc = q.popleft()
            if (br, bc) == target:
                return pushes

            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nbr, nbc = br + dr, bc + dc
                push_from_r, push_from_c = br - dr, bc - dc
                if 0 <= nbr < R and 0 <= nbc < C and grid[nbr][nbc] != "#":
                    if 0 <= push_from_r < R and 0 <= push_from_c < C and grid[push_from_r][push_from_c] != "#":
                        if can_reach((pr, pc), (push_from_r, push_from_c), (br, bc)):
                            nxt_state = (nbr, nbc, br, bc)
                            if nxt_state not in visited:
                                visited.add(nxt_state)
                                q.append((pushes + 1, nbr, nbc, br, bc))
        return -1

sol = Solution()
g1 = [["#","#","#","#","#","#"],
      ["#","T","#","#","#","#"],
      ["#",".",".","B",".","#"],
      ["#",".","#","#",".","#"],
      ["#",".",".",".","S","#"],
      ["#","#","#","#","#","#"]]
assert sol.minPushBox(g1) == 3
print("All tests passed successfully.")
