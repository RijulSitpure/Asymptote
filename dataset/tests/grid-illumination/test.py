from typing import List
from collections import defaultdict

class Solution:
    def gridIllumination(self, n: int, lamps: List[List[int]], queries: List[List[int]]) -> List[int]:
        active = set()
        row_cnt = defaultdict(int)
        col_cnt = defaultdict(int)
        diag1_cnt = defaultdict(int)
        diag2_cnt = defaultdict(int)

        for r, c in lamps:
            if (r, c) not in active:
                active.add((r, c))
                row_cnt[r] += 1
                col_cnt[c] += 1
                diag1_cnt[r - c] += 1
                diag2_cnt[r + c] += 1

        ans = []
        for r, c in queries:
            if row_cnt[r] > 0 or col_cnt[c] > 0 or diag1_cnt[r - c] > 0 or diag2_cnt[r + c] > 0:
                ans.append(1)
            else:
                ans.append(0)

            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    nr, nc = r + dr, c + dc
                    if (nr, nc) in active:
                        active.remove((nr, nc))
                        row_cnt[nr] -= 1
                        col_cnt[nc] -= 1
                        diag1_cnt[nr - nc] -= 1
                        diag2_cnt[nr + nc] -= 1
        return ans

def test():
    sol = Solution()
    assert sol.gridIllumination(5, [[0,0],[4,4]], [[1,1],[1,0]]) == [1, 0], "test 1 failed"
    assert sol.gridIllumination(5, [[0,0],[4,4]], [[1,1],[1,1]]) == [1, 1], "test 2 failed"
    print("✓ grid-illumination passed")

if __name__ == "__main__":
    test()
