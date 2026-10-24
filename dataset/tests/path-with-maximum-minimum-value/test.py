import heapq

class Solution:
    def maximumMinimumPath(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        heap = [(-grid[0][0], 0, 0)]
        visited = {(0, 0)}
        min_val = grid[0][0]
        
        while heap:
            neg_val, r, c = heapq.heappop(heap)
            min_val = min(min_val, -neg_val)
            if r == R - 1 and c == C - 1:
                return min_val
            
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    heapq.heappush(heap, (-grid[nr][nc], nr, nc))
        return min_val

def test():
    sol = Solution()
    g1 = [[5,4,5],[1,2,6],[7,4,6]]
    assert sol.maximumMinimumPath(g1) == 4, "test 1 failed"
    g2 = [[2,2,1,2,2,2],[1,2,2,2,1,2]]
    assert sol.maximumMinimumPath(g2) == 2, "test 2 failed"
    print("✓ path-with-maximum-minimum-value passed")

if __name__ == "__main__":
    test()
