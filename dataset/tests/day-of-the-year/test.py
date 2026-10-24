class Solution:
    def dayOfYear(self, date: str) -> int:
        year, month, day = map(int, date.split("-"))
        days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
        if is_leap:
            days_in_month[1] = 29
        return sum(days_in_month[:month - 1]) + day

def test():
    sol = Solution()
    assert sol.dayOfYear("2019-01-09") == 9, "test 1 failed"
    assert sol.dayOfYear("2019-02-10") == 41, "test 2 failed"
    assert sol.dayOfYear("2000-03-01") == 61, "test 3 failed"
    print("✓ day-of-the-year passed")

if __name__ == "__main__":
    test()
