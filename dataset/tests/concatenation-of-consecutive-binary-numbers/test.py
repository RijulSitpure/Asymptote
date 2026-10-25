class Solution:
    def concatenatedBinary(self, n: int) -> int:
        MOD = 10**9 + 7
        ans = 0
        bit_len = 0
        for i in range(1, n + 1):
            if i & (i - 1) == 0:
                bit_len += 1
            ans = ((ans << bit_len) | i) % MOD
        return ans

def test():
    sol = Solution()
    assert sol.concatenatedBinary(1) == 1
    assert sol.concatenatedBinary(3) == 27
    assert sol.concatenatedBinary(12) == 505379714

    print("✓ concatenation-of-consecutive-binary-numbers passed")

if __name__ == '__main__':
    test()
