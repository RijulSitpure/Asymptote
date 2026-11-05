class Solution:
    def findTheLongestBalancedSubstring(self, s: str) -> int:
        max_len = 0
        n = len(s)
        i = 0
        while i < n:
            zeros = 0
            while i < n and s[i] == '0':
                zeros += 1
                i += 1
            ones = 0
            while i < n and s[i] == '1':
                ones += 1
                i += 1
            max_len = max(max_len, 2 * min(zeros, ones))
        return max_len

def run_tests():
    sol = Solution()
    assert sol.findTheLongestBalancedSubstring("01000111") == 6 # "000111" -> 6
    assert sol.findTheLongestBalancedSubstring("00111") == 4 # "0011" -> 4
    assert sol.findTheLongestBalancedSubstring("111") == 0
    print("All tests passed for 3713.")

if __name__ == "__main__":
    run_tests()