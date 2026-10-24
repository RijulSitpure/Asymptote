class Solution:
    def preimageSizeFZF(self, k: int) -> int:
        def trailing_zeroes(x: int) -> int:
            res = 0
            while x > 0:
                res += x // 5
                x //= 5
            return res

        left, right = 0, 5 * (k + 1)
        while left <= right:
            mid = (left + right) // 2
            zeros = trailing_zeroes(mid)
            if zeros == k:
                return 5
            elif zeros < k:
                left = mid + 1
            else:
                right = mid - 1

        return 0

def test():
    sol = Solution()
    assert sol.preimageSizeFZF(0) == 5, "test 1 failed"
    assert sol.preimageSizeFZF(5) == 0, "test 2 failed"
    assert sol.preimageSizeFZF(3) == 5, "test 3 failed"
    print("✓ preimage-size-of-factorial-zeroes-function passed")

if __name__ == "__main__":
    test()
