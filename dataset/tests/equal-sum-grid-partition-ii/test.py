from typing import List

class Solution:
    def canPartitionGrid(self, grid: List[List[int]]) -> bool:
        total = sum(sum(r) for r in grid)

        def can(g: List[List[int]], s: int) -> bool:
            top = 0
            seen = set()
            for i in range(len(g)):
                top += sum(g[i])
                bot = s - top
                seen.update(g[i])
                if top - bot == 0 or top - bot == g[0][0] or top - bot == g[0][-1] or top - bot == g[i][0]:
                    return True
                if len(g[0]) > 1 and i > 0 and (top - bot) in seen:
                    return True
            return False

        transposed = [list(col) for col in zip(*grid)]
        return (
            can(grid, total)
            or can(grid[::-1], total)
            or can(transposed[::-1], total)
            or can(transposed, total)
        )

def run_tests():
    s = Solution()
    res = s.canPartitionGrid([[1, 2], [2, 1]])
    assert res is True, f"Expected True, got {res}"
    print("3548 equal-sum-grid-partition-ii PASSED")

if __name__ == "__main__":
    run_tests()
