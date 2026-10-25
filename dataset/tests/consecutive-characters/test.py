class Solution:
    def maxPower(self, s: str) -> int:
        max_p = 1
        cur = 1
        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                cur += 1
                max_p = max(max_p, cur)
            else:
                cur = 1
        return max_p

def test():
    sol = Solution()
    assert sol.maxPower("leetcode") == 2, "test 1 failed"
    assert sol.maxPower("abbcccddddeeeeedcba") == 5, "test 2 failed"
    print("✓ consecutive-characters passed")

if __name__ == "__main__":
    test()
