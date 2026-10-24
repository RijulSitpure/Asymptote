from typing import List

class Solution:
    def isRectangleOverlap(self, rec1: List[int], rec2: List[int]) -> bool:
        overlap_x = min(rec1[2], rec2[2]) > max(rec1[0], rec2[0])
        overlap_y = min(rec1[3], rec2[3]) > max(rec1[1], rec2[1])
        return overlap_x and overlap_y

def test():
    sol = Solution()
    assert sol.isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3]) is True, "test 1 failed"
    assert sol.isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1]) is False, "test 2 failed"
    print("✓ rectangle-overlap passed")

if __name__ == "__main__":
    test()
