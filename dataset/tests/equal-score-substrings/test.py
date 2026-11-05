class Solution:
    def countEqualScoreSubstrings(self, s: str) -> int:
        # Score of a character is ord(c) - ord('a') + 1
        # Substrings of even length 2k where score of left k chars == score of right k chars
        n = len(s)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + (ord(s[i]) - ord('a') + 1)
        count = 0
        for length in range(2, n + 1, 2):
            k = length // 2
            for start in range(n - length + 1):
                left_sum = pref[start + k] - pref[start]
                right_sum = pref[start + length] - pref[start + k]
                if left_sum == right_sum:
                    count += 1
        return count

def run_tests():
    sol = Solution()
    assert sol.countEqualScoreSubstrings("abba") == 2
    assert sol.countEqualScoreSubstrings("aa") == 1
    assert sol.countEqualScoreSubstrings("abc") == 0
    print("All tests passed for 3707.")

if __name__ == "__main__":
    run_tests()