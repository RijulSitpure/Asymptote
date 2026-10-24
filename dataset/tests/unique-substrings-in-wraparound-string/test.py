import sys

class Solution:
    def findSubstringInWraproundString(self, s: str) -> int:
        max_len = [0] * 26
        curr_len = 0
        for i in range(len(s)):
            if i > 0 and (ord(s[i]) - ord(s[i - 1])) % 26 == 1:
                curr_len += 1
            else:
                curr_len = 1
            idx = ord(s[i]) - ord("a")
            max_len[idx] = max(max_len[idx], curr_len)
        return sum(max_len)

def test():
    sol = Solution()
    assert sol.findSubstringInWraproundString("a") == 1, "test 1 failed"
    assert sol.findSubstringInWraproundString("cac") == 2, "test 2 failed"
    assert sol.findSubstringInWraproundString("zab") == 6, "test 3 failed"
    print("✓ unique-substrings-in-wraparound-string passed")

if __name__ == "__main__":
    test()
