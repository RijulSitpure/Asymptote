from typing import List

class Solution:
    def minDominoRotations(self, tops: List[int], bottoms: List[int]) -> int:
        def check(x: int) -> int:
            rotations_top = 0
            rotations_bottom = 0
            for i in range(len(tops)):
                if tops[i] != x and bottoms[i] != x:
                    return -1
                elif tops[i] != x:
                    rotations_top += 1
                elif bottoms[i] != x:
                    rotations_bottom += 1
            return min(rotations_top, rotations_bottom)

        res = check(tops[0])
        if res != -1 or tops[0] == bottoms[0]:
            return res
        return check(bottoms[0])

def test():
    sol = Solution()
    assert sol.minDominoRotations([2,1,2,4,2,2], [5,2,6,2,3,2]) == 2, "test 1 failed"
    assert sol.minDominoRotations([3,5,1,2,3], [3,6,3,3,4]) == -1, "test 2 failed"
    print("✓ minimum-domino-rotations-for-equal-row passed")

if __name__ == "__main__":
    test()
