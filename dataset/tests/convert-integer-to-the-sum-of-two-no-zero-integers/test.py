class Solution:
    def getNoZeroIntegers(self, n: int) -> list[int]:
        for a in range(1, n):
            b = n - a
            if "0" not in str(a) and "0" not in str(b):
                return [a, b]
        return []

def test():
    sol = Solution()
    assert sol.getNoZeroIntegers(2) == [1,1], "test 1 failed"
    assert sol.getNoZeroIntegers(11) == [2,9], "test 2 failed"
    print("✓ convert-integer-to-the-sum-of-two-no-zero-integers passed")

if __name__ == "__main__":
    test()
