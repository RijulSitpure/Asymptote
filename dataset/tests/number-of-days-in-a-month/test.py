class Solution:
    def numberOfDays(self, year: int, month: int) -> int:
        if month in {1, 3, 5, 7, 8, 10, 12}:
            return 31
        if month in {4, 6, 9, 11}:
            return 30
        is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
        return 29 if is_leap else 28

def test():
    sol = Solution()
    assert sol.numberOfDays(1992, 7) == 31, "test 1 failed"
    assert sol.numberOfDays(2000, 2) == 29, "test 2 failed"
    assert sol.numberOfDays(1900, 2) == 28, "test 3 failed"
    print("✓ number-of-days-in-a-month passed")

if __name__ == "__main__":
    test()
