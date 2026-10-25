class Solution:
    def numberOfRounds(self, loginTime: str, logoutTime: str) -> int:
        h1, m1 = map(int, loginTime.split(':'))
        h2, m2 = map(int, logoutTime.split(':'))
        t1 = h1 * 60 + m1
        t2 = h2 * 60 + m2

        if t2 < t1:
            t2 += 24 * 60

        start = ((t1 + 14) // 15) * 15
        end = (t2 // 15) * 15

        if end < start:
            return 0
        return (end - start) // 15

def test():
    sol = Solution()
    assert sol.numberOfRounds("12:01", "12:44") == 1
    assert sol.numberOfRounds("20:00", "06:00") == 40
    assert sol.numberOfRounds("00:00", "23:59") == 95
    assert sol.numberOfRounds("00:47", "00:57") == 0

if __name__ == '__main__':
    test()
