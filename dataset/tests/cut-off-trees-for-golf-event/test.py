from typing import List
import collections

class Solution:
    def cutOffTree(self, forest: List[List[int]]) -> int:
        m, n = len(forest), len(forest[0])
        trees = []
        for r in range(m):
            for c in range(n):
                if forest[r][c] > 1:
                    trees.append((forest[r][c], r, c))
        trees.sort()

        def bfs(sr, sc, tr, tc):
            if sr == tr and sc == tc:
                return 0
            queue = collections.deque([(sr, sc, 0)])
            visited = {(sr, sc)}
            while queue:
                r, c, d = queue.popleft()
                for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                    if 0 <= nr < m and 0 <= nc < n and forest[nr][nc] != 0 and (nr, nc) not in visited:
                        if nr == tr and nc == tc:
                            return d + 1
                        visited.add((nr, nc))
                        queue.append((nr, nc, d + 1))
            return -1

        total_steps = 0
        curr_r, curr_c = 0, 0
        for h, tr, tc in trees:
            d = bfs(curr_r, curr_c, tr, tc)
            if d == -1:
                return -1
            total_steps += d
            curr_r, curr_c = tr, tc
        return total_steps

def test():
    sol = Solution()
    assert sol.cutOffTree([[1,2,3],[0,0,4],[7,6,5]]) == 6, "test 1 failed"
    assert sol.cutOffTree([[1,2,3],[0,0,0],[7,6,5]]) == -1, "test 2 failed"
    assert sol.cutOffTree([[2,3,4],[0,0,5],[8,7,6]]) == 6, "test 3 failed"
    print("✓ cut-off-trees-for-golf-event passed")

if __name__ == "__main__":
    test()
