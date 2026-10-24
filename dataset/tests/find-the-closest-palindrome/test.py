class Solution:
    def nearestPalindromic(self, n: str) -> str:
        L = len(n)
        candidates = {str(10**(L - 1) - 1), str(10**L + 1)}
        prefix = int(n[:(L + 1) // 2])

        for p in (prefix - 1, prefix, prefix + 1):
            s = str(p)
            if L % 2 == 0:
                pal = s + s[::-1]
            else:
                pal = s + s[:-1][::-1]
            candidates.add(pal)

        candidates.discard(n)
        orig = int(n)
        return min(candidates, key=lambda x: (abs(int(x) - orig), int(x)))

def test():
    sol = Solution()
    assert sol.nearestPalindromic("123") == "121", "test 1 failed"
    assert sol.nearestPalindromic("1") == "0", "test 2 failed"
    print("✓ find-the-closest-palindrome passed")

if __name__ == "__main__":
    test()
