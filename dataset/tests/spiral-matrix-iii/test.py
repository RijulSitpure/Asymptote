from typing import List

class Solution:
    def spiralMatrixIII(self, rows: int, cols: int, rStart: int, cStart: int) -> List[List[int]]:
        ans = [[rStart, cStart]]
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        d = 0
        step = 1
        r, c = rStart, cStart

        while len(ans) < rows * cols:
            for _ in range(2):
                dr, dc = dirs[d]
                for _ in range(step):
                    r += dr
                    c += dc
                    if 0 <= r < rows and 0 <= c < cols:
                        ans.append([r, c])
                d = (d + 1) % 4
            step += 1
        return ans

def test():
    sol = Solution()
    res1 = sol.spiralMatrixIII(1, 4, 0, 0)
    assert res1 == [[0, 0], [0, 1], [0, 2], [0, 3]], f"test 1 failed: {res1}"
    res2 = sol.spiralMatrixIII(5, 6, 1, 4)
    assert len(res2) == 30, f"test 2 failed: {len(res2)}"
    assert res2[0] == [1, 4]
    print("✓ spiral-matrix-iii passed")

if __name__ == "__main__":
    test()
