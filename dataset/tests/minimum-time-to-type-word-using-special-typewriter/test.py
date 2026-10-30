class Solution:
    def minTimeToType(self, word: str) -> int:
        curr = "a"
        ans = 0
        for c in word:
            diff = abs(ord(c) - ord(curr))
            ans += min(diff, 26 - diff) + 1
            curr = c
        return ans

def test_min_time_to_type():
    sol = Solution()
    assert sol.minTimeToType("abc") == 5
    assert sol.minTimeToType("bza") == 7
    assert sol.minTimeToType("zjpc") == 34

