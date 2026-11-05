class Solution:
    def findClosest(self, x: int, y: int, z: int) -> int:
        dx = abs(x - z)
        dy = abs(y - z)
        if dx < dy:
            return 1
        elif dy < dx:
            return 2
        return 0

def run_tests():
    s = Solution()
    assert s.findClosest(2, 5, 3) == 1
    assert s.findClosest(1, 5, 3) == 0
    assert s.findClosest(6, 4, 3) == 2
    print("All tests passed for find-closest-person")

if __name__ == '__main__':
    run_tests()
