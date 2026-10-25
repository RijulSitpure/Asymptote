class Solution:
    def nthPersonGetsNthSeat(self, n: int) -> float:
        return 1.0 if n == 1 else 0.5

def test():
    sol = Solution()
    assert sol.nthPersonGetsNthSeat(1) == 1.0, "test 1 failed"
    assert sol.nthPersonGetsNthSeat(2) == 0.5, "test 2 failed"
    assert sol.nthPersonGetsNthSeat(100) == 0.5, "test 3 failed"
    print("✓ airplane-seat-assignment-probability passed")

if __name__ == "__main__":
    test()
