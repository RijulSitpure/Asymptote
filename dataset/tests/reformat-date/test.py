class Solution:
    def reformatDate(self, date: str) -> str:
        months = {
            "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
            "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
            "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        }
        day_token, mon_token, year = date.split()
        day_digits = "".join([c for c in day_token if c.isdigit()])
        if len(day_digits) == 1:
            day_digits = "0" + day_digits
        return f"{year}-{months[mon_token]}-{day_digits}"

def test():
    sol = Solution()
    assert sol.reformatDate("20th Oct 2052") == "2052-10-20", "test 1 failed"
    assert sol.reformatDate("6th Jun 1933") == "1933-06-06", "test 2 failed"
    assert sol.reformatDate("26th May 1960") == "1960-05-26", "test 3 failed"
    print("✓ reformat-date passed")

if __name__ == "__main__":
    test()
