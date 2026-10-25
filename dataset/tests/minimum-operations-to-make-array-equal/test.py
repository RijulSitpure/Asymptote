class Solution:
    def minOperations(self, n: int) -> int:
        return (n * n) // 4

def test():
    sol = Solution()
    assert sol.minOperations(3) == 2, "test 1 failed"
    assert sol.minOperations(6) == 9, "test 2 failed"
    print("✓ minimum-operations-to-make-array-equal passed")

if __name__ == "__main__":
    test()
