class Solution:
    def numDupDigitsAtMostN(self, n: int) -> int:
        import math
        s = str(n)
        k = len(s)

        def perm(m, c):
            return math.perm(m, c)

        unique = 0
        for length in range(1, k):
            unique += 9 * perm(9, length - 1)

        seen = set()
        for i, ch in enumerate(s):
            d = int(ch)
            start = 1 if i == 0 else 0
            for opt in range(start, d):
                if opt not in seen:
                    unique += perm(9 - i, k - 1 - i)
            if d in seen:
                break
            seen.add(d)
        else:
            unique += 1

        return n - unique

def test():
    sol = Solution()
    assert sol.numDupDigitsAtMostN(20) == 1, "test 1 failed"
    assert sol.numDupDigitsAtMostN(100) == 10, "test 2 failed"
    assert sol.numDupDigitsAtMostN(1000) == 262, "test 3 failed"
    print("✓ numbers-with-repeated-digits passed")

if __name__ == "__main__":
    test()
