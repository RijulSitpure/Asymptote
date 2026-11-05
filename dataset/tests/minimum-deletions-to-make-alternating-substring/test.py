class Solution:
    def minDeletionsAlternating(self, s: str) -> int:
        if not s:
            return 0
        
        max_alt_len = 1
        for i in range(1, len(s)):
            if s[i] != s[i - 1]:
                max_alt_len += 1
        
        return len(s) - max_alt_len

def run_tests():
    sol = Solution()
    assert sol.minDeletionsAlternating("01010") == 0
    assert sol.minDeletionsAlternating("000111") == 4 # '01' has length 2, deletions = 6 - 2 = 4
    assert sol.minDeletionsAlternating("1111") == 3
    print("All tests passed for 3777.")

if __name__ == "__main__":
    run_tests()
