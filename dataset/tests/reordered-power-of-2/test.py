class Solution:
    def reorderedPowerOf2(self, n: int) -> bool:
        target = sorted(str(n))
        return any(sorted(str(1 << i)) == target for i in range(30))

def test():
    sol = Solution()
    assert sol.reorderedPowerOf2(1) is True, "test 1 failed"
    assert sol.reorderedPowerOf2(10) is False, "test 2 failed"
    assert sol.reorderedPowerOf2(46) is True, "test 3 failed"
    print("✓ reordered-power-of-2 passed")

if __name__ == "__main__":
    test()
