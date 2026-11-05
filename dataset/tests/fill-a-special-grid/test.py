from typing import List

class Solution:
    def specialGrid(self, n: int) -> List[List[int]]:
        sz = 1 << n
        grid = [[0] * sz for _ in range(sz)]
        count = 0

        def fill(x1: int, x2: int, y1: int, y2: int) -> None:
            nonlocal count
            if x2 - x1 == 1:
                grid[x1][y1] = count
                count += 1
                return
            midR = (x1 + x2) // 2
            midC = (y1 + y2) // 2
            fill(x1, midR, midC, y2)
            fill(midR, x2, midC, y2)
            fill(midR, x2, y1, midC)
            fill(x1, midR, y1, midC)

        fill(0, sz, 0, sz)
        return grid

def run_tests():
    s = Solution()
    res1 = s.specialGrid(1)
    assert res1 == [[3, 0], [2, 1]], f"Expected [[3, 0], [2, 1]], got {res1}"
    res2 = s.specialGrid(0)
    assert res2 == [[0]], f"Expected [[0]], got {res2}"
    print("3537 fill-a-special-grid PASSED")

if __name__ == "__main__":
    run_tests()
