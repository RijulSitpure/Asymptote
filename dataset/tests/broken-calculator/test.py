class Solution:
    def brokenCalc(self, startValue: int, target: int) -> int:
        ans = 0
        while target > startValue:
            ans += 1
            if target % 2 == 1:
                target += 1
            else:
                target //= 2
        return ans + (startValue - target)

def test():
    sol = Solution()
    assert sol.brokenCalc(2, 3) == 2, "test 1 failed"
    assert sol.brokenCalc(5, 8) == 2, "test 2 failed"
    assert sol.brokenCalc(3, 10) == 3, "test 3 failed"
    print("✓ broken-calculator passed")

if __name__ == "__main__":
    test()
