class Solution:
    def findTheLongestSubstring(self, s: str) -> int:
        vowels = {"a": 0, "e": 1, "i": 2, "o": 3, "u": 4}
        seen = {0: -1}
        mask = 0
        max_len = 0
        for i, ch in enumerate(s):
            if ch in vowels:
                mask ^= (1 << vowels[ch])
            if mask in seen:
                max_len = max(max_len, i - seen[mask])
            else:
                seen[mask] = i
        return max_len

def test():
    sol = Solution()
    assert sol.findTheLongestSubstring("eleetminicoworoep") == 13, "test 1 failed"
    assert sol.findTheLongestSubstring("leetcodeisgreat") == 5, "test 2 failed"
    assert sol.findTheLongestSubstring("bcbcbc") == 6, "test 3 failed"
    print("✓ find-the-longest-substring-containing-vowels-in-even-counts passed")

if __name__ == "__main__":
    test()
