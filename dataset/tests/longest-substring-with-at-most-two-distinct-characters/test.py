import sys

class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        from collections import defaultdict
        counts = defaultdict(int)
        left = 0
        max_len = 0
        for right in range(len(s)):
            counts[s[right]] += 1
            while len(counts) > 2:
                counts[s[left]] -= 1
                if counts[s[left]] == 0:
                    del counts[s[left]]
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len

def test():
    sol = Solution()
    assert sol.lengthOfLongestSubstringTwoDistinct("eceba") == 3, "test 1 failed"
    assert sol.lengthOfLongestSubstringTwoDistinct("ccaabbb") == 5, "test 2 failed"
    print("✓ longest-substring-with-at-most-two-distinct-characters passed")

if __name__ == "__main__":
    test()
