class Solution:
    def dayOfTheWeek(self, day: int, month: int, year: int) -> str:
        days_names = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
        days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        
        def is_leap(y):
            return (y % 4 == 0 and y % 100 != 0) or (y % 400 == 0)
        
        total = 0
        for y in range(1971, year):
            total += 366 if is_leap(y) else 365
        
        for m in range(1, month):
            if m == 2 and is_leap(year):
                total += 29
            else:
                total += days_in_month[m - 1]
        
        total += day - 1
        return days_names[total % 7]

def test():
    sol = Solution()
    assert sol.dayOfTheWeek(31, 8, 2019) == "Saturday", "test 1 failed"
    assert sol.dayOfTheWeek(18, 7, 1999) == "Sunday", "test 2 failed"
    assert sol.dayOfTheWeek(15, 8, 1993) == "Sunday", "test 3 failed"
    print("✓ day-of-the-week passed")

if __name__ == "__main__":
    test()
