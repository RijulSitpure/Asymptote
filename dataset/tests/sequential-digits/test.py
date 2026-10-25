class Solution:
    def sequentialDigits(self, low: int, high: int) -> list[int]:
        s = "123456789"
        res = []
        for length in range(1, 10):
            for start in range(len(s) - length + 1):
                val = int(s[start:start + length])
                if low <= val <= high:
                    res.append(val)
        return res

def test():
    sol = Solution()
    assert sol.sequentialDigits(100, 300) == [123,234], "test 1 failed"
    assert sol.sequentialDigits(1000, 13000) == [1234,2345,3456,4567,5678,6789,12345], "test 2 failed"
    print("✓ sequential-digits passed")

if __name__ == "__main__":
    test()
