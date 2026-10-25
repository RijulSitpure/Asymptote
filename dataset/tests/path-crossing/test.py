class Solution:
    def isPathCrossing(self, path: str) -> bool:
        visited = {(0, 0)}
        x, y = 0, 0
        dirs = {"N": (0, 1), "S": (0, -1), "E": (1, 0), "W": (-1, 0)}
        for move in path:
            dx, dy = dirs[move]
            x += dx
            y += dy
            if (x, y) in visited:
                return True
            visited.add((x, y))
        return False

def test():
    sol = Solution()
    assert sol.isPathCrossing("NES") == False, "test 1 failed"
    assert sol.isPathCrossing("NESWW") == True, "test 2 failed"
    print("✓ path-crossing passed")

if __name__ == "__main__":
    test()
