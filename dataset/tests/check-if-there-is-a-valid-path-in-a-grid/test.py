from collections import deque

class Solution:
    def hasValidPath(self, grid: list[list[int]]) -> bool:
        R, C = len(grid), len(grid[0])
        # directions: 0: up, 1: right, 2: down, 3: left
        opp = {0: 2, 1: 3, 2: 0, 3: 1}
        delta = {0: (-1, 0), 1: (0, 1), 2: (1, 0), 3: (0, -1)}
        ports = {
            1: [1, 3],
            2: [0, 2],
            3: [2, 3],
            4: [1, 2],
            5: [0, 3],
            6: [0, 1]
        }
        visited = set([(0, 0)])
        q = deque([(0, 0)])
        while q:
            r, c = q.popleft()
            if (r, c) == (R - 1, C - 1):
                return True
            for d in ports[grid[r][c]]:
                dr, dc = delta[d]
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and (nr, nc) not in visited:
                    if opp[d] in ports[grid[nr][nc]]:
                        visited.add((nr, nc))
                        q.append((nr, nc))
        return False

def test():
    sol = Solution()
    assert sol.hasValidPath([[2,4,3],[6,5,2]]) == True, "test 1 failed"
    assert sol.hasValidPath([[1,2,1],[1,2,1]]) == False, "test 2 failed"
    assert sol.hasValidPath([[1,1,2]]) == False, "test 3 failed"
    print("✓ check-if-there-is-a-valid-path-in-a-grid passed")

if __name__ == "__main__":
    test()
