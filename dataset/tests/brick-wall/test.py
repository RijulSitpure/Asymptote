import sys
from typing import List

class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        from collections import defaultdict
        edge_counts = defaultdict(int)
        for row in wall:
            curr = 0
            for brick in row[:-1]:
                curr += brick
                edge_counts[curr] += 1
        max_edges = max(edge_counts.values()) if edge_counts else 0
        return len(wall) - max_edges

def test():
    sol = Solution()
    wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
    assert sol.leastBricks(wall) == 2, "test 1 failed"
    assert sol.leastBricks([[1],[1],[1]]) == 3, "test 2 failed"
    print("✓ brick-wall passed")

if __name__ == "__main__":
    test()
