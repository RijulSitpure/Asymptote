class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        flips = 0
        for i in range(32):
            ba = (a >> i) & 1
            bb = (b >> i) & 1
            bc = (c >> i) & 1
            if bc == 0:
                flips += ba + bb
            else:
                if ba == 0 and bb == 0:
                    flips += 1
        return flips

def test():
    sol = Solution()
    assert sol.minFlips(2, 6, 5) == 3, "test 1 failed"
    assert sol.minFlips(4, 2, 7) == 1, "test 2 failed"
    assert sol.minFlips(1, 2, 3) == 0, "test 3 failed"
    print("✓ minimum-flips-to-make-a-or-b-equal-to-c passed")

if __name__ == "__main__":
    test()
