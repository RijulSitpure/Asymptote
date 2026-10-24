class Solution:
    def bitwiseComplement(self, n: int) -> int:
        if n == 0:
            return 1
        mask = (1 << n.bit_length()) - 1
        return n ^ mask

def test():
    sol = Solution()
    assert sol.bitwiseComplement(5) == 2, "test 1 failed"
    assert sol.bitwiseComplement(7) == 0, "test 2 failed"
    assert sol.bitwiseComplement(10) == 5, "test 3 failed"
    assert sol.bitwiseComplement(0) == 1, "test 4 failed"
    print("✓ complement-of-base-10-integer passed")

if __name__ == "__main__":
    test()
