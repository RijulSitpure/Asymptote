class Solution:
    def xorOperation(self, n: int, start: int) -> int:
        ans = 0
        for i in range(n):
            ans ^= (start + 2 * i)
        return ans

def test():
    sol = Solution()
    assert sol.xorOperation(5, 0) == 8, "test 1 failed"
    assert sol.xorOperation(4, 3) == 8, "test 2 failed"
    assert sol.xorOperation(1, 7) == 7, "test 3 failed"
    print("✓ xor-operation-in-an-array passed")

if __name__ == "__main__":
    test()
