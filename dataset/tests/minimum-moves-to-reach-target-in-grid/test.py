class Solution:
    def minMoves(self, targetX: int, targetY: int) -> int:
        # Move step k has length 2^(k-1) or step size k
        # Target coordinate absolute distances
        x = abs(targetX)
        y = abs(targetY)
        s = x + y
        if s == 0:
            return 0
        # Minimal steps n where n*(n+1)//2 >= s and (n*(n+1)//2 - s) % 2 == 0
        n = 0
        total = 0
        while total < s or (total - s) % 2 != 0:
            n += 1
            total += n
        return n

def run_tests():
    s = Solution()
    res1 = s.minMoves(2, 3) # sum 5: n=3 gives sum 6 (diff 1 odd), n=4 gives sum 10 (diff 5 odd), n=5 gives sum 15 (diff 10 even) -> 5
    assert res1 == 5, f"Expected 5, got {res1}"
    res2 = s.minMoves(0, 0)
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3609 minimum-moves-to-reach-target-in-grid PASSED")

if __name__ == "__main__":
    run_tests()
