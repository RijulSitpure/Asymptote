import math

class Solution:
    def isGoodArray(self, nums: list[int]) -> bool:
        g = nums[0]
        for x in nums:
            g = math.gcd(g, x)
            if g == 1:
                return True
        return g == 1

def test():
    sol = Solution()
    assert sol.isGoodArray([12, 5, 7, 23]) is True, "test 1 failed"
    assert sol.isGoodArray([29, 6, 10]) is True, "test 2 failed"
    assert sol.isGoodArray([3, 6]) is False, "test 3 failed"
    print("✓ check-if-it-is-a-good-array passed")

if __name__ == "__main__":
    test()
