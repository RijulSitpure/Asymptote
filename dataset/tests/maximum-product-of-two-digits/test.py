class Solution:
    def maxProduct(self, n: int) -> int:
        s = sorted(str(n))
        return int(s[-1]) * int(s[-2])

def run_tests():
    s = Solution()
    assert s.maxProduct(12345) == 20
    assert s.maxProduct(99) == 81
    print("All tests passed for maximum-product-of-two-digits")

if __name__ == '__main__':
    run_tests()
