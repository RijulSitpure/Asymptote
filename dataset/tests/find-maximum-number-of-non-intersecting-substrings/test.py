class Solution:
    def maxSubstrings(self, word: str) -> int:
        ans = 0
        first_seen = {}

        for i, c in enumerate(word):
            if c not in first_seen:
                first_seen[c] = i
            elif i - first_seen[c] + 1 >= 4:
                ans += 1
                first_seen.clear()

        return ans

def run_tests():
    s = Solution()
    res = s.maxSubstrings("bcdaaaabcdaaaa")
    assert res == 2, f"Expected 2, got {res}"
    print("3557 find-maximum-number-of-non-intersecting-substrings PASSED")

if __name__ == "__main__":
    run_tests()
