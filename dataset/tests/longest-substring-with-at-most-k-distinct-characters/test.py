import sys

class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        if k == 0:
            return 0
        from collections import defaultdict
        counts = defaultdict(int)
        left = 0
        max_len = 0
        for right, ch in enumerate(s):
            counts[ch] += 1
            while len(counts) > k:
                counts[s[left]] -= 1
                if counts[s[left]] == 0:
                    del counts[s[left]]
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len

def test():
    sol = Solution()
    assert sol.lengthOfLongestSubstringKDistinct("eceba", 2) == 3, "test 1 failed"
    assert sol.lengthOfLongestSubstringKDistinct("aa", 1) == 2, "test 2 failed"
    assert sol.lengthOfLongestSubstringKDistinct("a", 0) == 0, "test 3 failed"
    print("✓ longest-substring-with-at-most-k-distinct-characters passed")

if __name__ == "__main__":
    test()
