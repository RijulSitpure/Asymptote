class Solution:
    def daysBetweenDates(self, date1: str, date2: str) -> int:
        def is_leap(y):
            return (y % 4 == 0 and y % 100 != 0) or y % 400 == 0
        def days_since_1971(date):
            y, m, d = map(int, date.split("-"))
            days = d
            month_days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            for cur_y in range(1971, y):
                days += 366 if is_leap(cur_y) else 365
            for cur_m in range(1, m):
                days += month_days[cur_m]
                if cur_m == 2 and is_leap(y):
                    days += 1
            return days
        return abs(days_since_1971(date1) - days_since_1971(date2))

def test():
    sol = Solution()
    assert sol.daysBetweenDates("2019-06-29", "2019-06-30") == 1, "test 1 failed"
    assert sol.daysBetweenDates("2020-01-15", "2019-12-31") == 15, "test 2 failed"
    print("✓ number-of-days-between-two-dates passed")

if __name__ == "__main__":
    test()
