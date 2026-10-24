from typing import List

class Solution:
    def escapeGhosts(self, ghosts: List[List[int]], target: List[int]) -> bool:
        your_dist = abs(target[0]) + abs(target[1])
        return all(abs(g[0] - target[0]) + abs(g[1] - target[1]) > your_dist for g in ghosts)

def test():
    sol = Solution()
    assert sol.escapeGhosts([[1, 0], [0, 3]], [0, 1]) is True, "test 1 failed"
    assert sol.escapeGhosts([[1, 0]], [2, 0]) is False, "test 2 failed"
    assert sol.escapeGhosts([[2, 0]], [1, 0]) is False, "test 3 failed"
    print("✓ escape-the-ghosts passed")

if __name__ == "__main__":
    test()
