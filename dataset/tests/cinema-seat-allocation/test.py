from collections import defaultdict

class Solution:
    def maxNumberOfFamilies(self, n: int, reservedSeats: list[list[int]]) -> int:
        rows = defaultdict(int)
        for r, c in reservedSeats:
            if 2 <= c <= 9:
                rows[r] |= (1 << (c - 2))
        res = 2 * (n - len(rows))
        for mask in rows.values():
            left = not (mask & 0b00001111)
            right = not (mask & 0b11110000)
            mid = not (mask & 0b00111100)
            if left and right:
                res += 2
            elif left or right or mid:
                res += 1
        return res

def test():
    sol = Solution()
    assert sol.maxNumberOfFamilies(3, [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]) == 4, "test 1 failed"
    assert sol.maxNumberOfFamilies(2, [[2,1],[1,8],[2,6]]) == 2, "test 2 failed"
    assert sol.maxNumberOfFamilies(4, [[4,3],[1,4],[4,6],[1,7]]) == 4, "test 3 failed"
    print("✓ cinema-seat-allocation passed")

if __name__ == "__main__":
    test()
