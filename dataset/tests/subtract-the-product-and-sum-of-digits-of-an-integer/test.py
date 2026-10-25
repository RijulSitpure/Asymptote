class Solution:
    def subtractProductAndSum(self, n: int) -> int:
        prod = 1
        s = 0
        while n > 0:
            d = n % 10
            prod *= d
            s += d
            n //= 10
        return prod - s

def test():
    sol = Solution()
    assert sol.subtractProductAndSum(234) == 15, "test 1 failed"
    assert sol.subtractProductAndSum(4421) == 21, "test 2 failed"
    print("✓ subtract-the-product-and-sum-of-digits-of-an-integer passed")

if __name__ == "__main__":
    test()
