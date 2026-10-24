import sys
from typing import List

class Solution:
    def minArea(self, image: List[List[str]], x: int, y: int) -> int:
        m, n = len(image), len(image[0])

        def search_row(low: int, high: int, check_has_one: bool) -> int:
            while low < high:
                mid = (low + high) // 2
                has_one = any(image[mid][c] == "1" for c in range(n))
                if has_one == check_has_one:
                    high = mid
                else:
                    low = mid + 1
            return low

        def search_col(low: int, high: int, check_has_one: bool) -> int:
            while low < high:
                mid = (low + high) // 2
                has_one = any(image[r][mid] == "1" for r in range(m))
                if has_one == check_has_one:
                    high = mid
                else:
                    low = mid + 1
            return low

        top = search_row(0, x, True)
        bottom = search_row(x + 1, m, False)
        left = search_col(0, y, True)
        right = search_col(y + 1, n, False)

        return (bottom - top) * (right - left)

def test():
    sol = Solution()
    img1 = [["0","0","1","0"],["0","1","1","0"],["0","1","0","0"]]
    assert sol.minArea(img1, 0, 2) == 6, "test 1 failed"
    img2 = [["1"]]
    assert sol.minArea(img2, 0, 0) == 1, "test 2 failed"
    print("✓ smallest-rectangle-enclosing-black-pixels passed")

if __name__ == "__main__":
    test()
