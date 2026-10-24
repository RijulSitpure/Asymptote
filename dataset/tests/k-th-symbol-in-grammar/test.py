class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        return (k - 1).bit_count() % 2

def test():
    sol = Solution()
    assert sol.kthGrammar(1, 1) == 0, "test 1 failed"
    assert sol.kthGrammar(2, 1) == 0, "test 2 failed"
    assert sol.kthGrammar(2, 2) == 1, "test 3 failed"
    print("✓ k-th-symbol-in-grammar passed")

if __name__ == "__main__":
    test()
