import sys

class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        from collections import Counter
        counts = Counter(s)
        odd_count = sum(1 for c in counts.values() if c % 2 == 1)
        return odd_count <= 1

def test():
    sol = Solution()
    assert sol.canPermutePalindrome("code") is False, "test 1 failed"
    assert sol.canPermutePalindrome("aab") is True, "test 2 failed"
    assert sol.canPermutePalindrome("carerac") is True, "test 3 failed"
    print("✓ palindrome-permutation passed")

if __name__ == "__main__":
    test()
