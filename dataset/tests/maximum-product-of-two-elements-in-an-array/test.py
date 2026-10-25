class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        m1 = m2 = 0
        for x in nums:
            if x > m1:
                m2 = m1
                m1 = x
            elif x > m2:
                m2 = x
        return (m1 - 1) * (m2 - 1)

def test():
    sol = Solution()
    assert sol.maxProduct([3,4,5,2]) == 12, "test 1 failed"
    assert sol.maxProduct([1,5,4,5]) == 16, "test 2 failed"
    assert sol.maxProduct([3,7]) == 12, "test 3 failed"
    print("✓ maximum-product-of-two-elements-in-an-array passed")

if __name__ == "__main__":
    test()
