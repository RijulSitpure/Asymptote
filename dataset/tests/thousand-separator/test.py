class Solution:
    def thousandSeparator(self, n: int) -> str:
        s = str(n)
        res = []
        for i, ch in enumerate(reversed(s)):
            if i > 0 and i % 3 == 0:
                res.append(".")
            res.append(ch)
        return "".join(reversed(res))

def test():
    sol = Solution()
    assert sol.thousandSeparator(987) == "987", "test 1 failed"
    assert sol.thousandSeparator(1234) == "1.234", "test 2 failed"
    assert sol.thousandSeparator(123456789) == "123.456.789", "test 3 failed"
    print("✓ thousand-separator passed")

if __name__ == "__main__":
    test()
