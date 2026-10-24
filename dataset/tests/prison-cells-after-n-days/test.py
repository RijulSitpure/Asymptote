from typing import List

class Solution:
    def prisonAfterNDays(self, cells: List[int], n: int) -> List[int]:
        seen = {}
        while n > 0:
            c_tuple = tuple(cells)
            if c_tuple in seen:
                cycle = seen[c_tuple] - n
                n %= cycle
                if n == 0:
                    break
            seen[c_tuple] = n
            if n > 0:
                n -= 1
                cells = [0] + [1 if cells[i - 1] == cells[i + 1] else 0 for i in range(1, 7)] + [0]
        return cells

def test():
    sol = Solution()
    c1 = [0,1,0,1,1,0,0,1]
    assert sol.prisonAfterNDays(c1, 7) == [0,0,1,1,0,0,0,0], "test 1 failed"
    c2 = [1,0,0,1,0,0,1,0]
    assert sol.prisonAfterNDays(c2, 1000000000) == [0,0,1,1,1,1,1,0], "test 2 failed"
    print("✓ prison-cells-after-n-days passed")

if __name__ == "__main__":
    test()
