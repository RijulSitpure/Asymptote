import sys

class Solution:
    def flipLights(self, n: int, presses: int) -> int:
        if presses == 0:
            return 1
        if n == 1:
            return 2
        if n == 2:
            return 3 if presses == 1 else 4
        if presses == 1:
            return 4
        if presses == 2:
            return 7
        return 8

def test():
    sol = Solution()
    assert sol.flipLights(1, 1) == 2, "test 1 failed"
    assert sol.flipLights(2, 1) == 3, "test 2 failed"
    assert sol.flipLights(3, 1) == 4, "test 3 failed"
    print("✓ bulb-switcher-ii passed")

if __name__ == "__main__":
    test()
