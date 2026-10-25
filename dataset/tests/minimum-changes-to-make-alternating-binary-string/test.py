class Solution:
    def minOperations(self, s: str) -> int:
        c0 = 0
        for i, c in enumerate(s):
            expected = '0' if i % 2 == 0 else '1'
            if c != expected:
                c0 += 1
        return min(c0, len(s) - c0)

def test():
    sol = Solution()
    assert sol.minOperations("0100") == 1
    assert sol.minOperations("10") == 0
    assert sol.minOperations("1111") == 2

    print("✓ minimum-changes-to-make-alternating-binary-string passed")

if __name__ == '__main__':
    test()
