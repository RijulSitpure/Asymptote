class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        x, y = 0, 0
        dx, dy = 0, 1
        for inst in instructions:
            if inst == 'G':
                x += dx
                y += dy
            elif inst == 'L':
                dx, dy = -dy, dx
            elif inst == 'R':
                dx, dy = dy, -dx
        return (x == 0 and y == 0) or (dx, dy) != (0, 1)

def test():
    sol = Solution()
    assert sol.isRobotBounded("GGLLGG") == True, "test 1 failed"
    assert sol.isRobotBounded("GG") == False, "test 2 failed"
    assert sol.isRobotBounded("GL") == True, "test 3 failed"
    print("✓ robot-bounded-in-circle passed")

if __name__ == "__main__":
    test()
