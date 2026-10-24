from typing import List

class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        obs = {(x, y) for x, y in obstacles}
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        d = 0
        x = y = 0
        max_dist = 0

        for cmd in commands:
            if cmd == -1:
                d = (d + 1) % 4
            elif cmd == -2:
                d = (d + 3) % 4
            else:
                dx, dy = dirs[d]
                for _ in range(cmd):
                    if (x + dx, y + dy) in obs:
                        break
                    x += dx
                    y += dy
                    max_dist = max(max_dist, x * x + y * y)
        return max_dist

def test():
    sol = Solution()
    assert sol.robotSim([4, -1, 3], []) == 25, "test 1 failed"
    assert sol.robotSim([4, -1, 4, -2, 4], [[2, 4]]) == 65, "test 2 failed"
    assert sol.robotSim([6, -1, -1, 6], []) == 36, "test 3 failed"
    print("✓ walking-robot-simulation passed")

if __name__ == "__main__":
    test()
