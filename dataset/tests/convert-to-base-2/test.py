class Solution:
    def baseNeg2(self, n: int) -> str:
        if n == 0:
            return "0"
        res = []
        while n != 0:
            rem = n % (-2)
            n = n // (-2)
            if rem < 0:
                rem += 2
                n += 1
            res.append(str(rem))
        return "".join(reversed(res))

def test():
    sol = Solution()
    assert sol.baseNeg2(2) == "110", "test 1 failed"
    assert sol.baseNeg2(3) == "111", "test 2 failed"
    assert sol.baseNeg2(4) == "100", "test 3 failed"
    assert sol.baseNeg2(0) == "0", "test 4 failed"
    print("✓ convert-to-base-2 passed")

if __name__ == "__main__":
    test()
