import functools

class Solution:
    def minKnightMoves(self, x: int, y: int) -> int:
        @functools.lru_cache(None)
        def dfs(cx: int, cy: int) -> int:
            if cx + cy == 0:
                return 0
            if cx + cy == 2:
                return 2
            if cx + cy == 1:
                return 3
            return min(dfs(abs(cx - 1), abs(cy - 2)), dfs(abs(cx - 2), abs(cy - 1))) + 1
            
        return dfs(abs(x), abs(y))

def test():
    sol = Solution()
    assert sol.minKnightMoves(2, 1) == 1, "test 1 failed"
    assert sol.minKnightMoves(5, 5) == 4, "test 2 failed"
    assert sol.minKnightMoves(0, 0) == 0, "test 3 failed"
    print("✓ minimum-knight-moves passed")

if __name__ == "__main__":
    test()
