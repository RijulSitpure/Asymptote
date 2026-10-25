class Solution:
    def minimumOneBitOperations(self, n: int) -> int:
        ans = 0
        while n > 0:
            ans ^= n
            n >>= 1
        return ans

def test():
    sol = Solution()
    assert sol.minimumOneBitOperations(3) == 2
    assert sol.minimumOneBitOperations(6) == 4
    assert sol.minimumOneBitOperations(0) == 0

    print("✓ minimum-one-bit-operations-to-make-integers-zero passed")

if __name__ == '__main__':
    test()
