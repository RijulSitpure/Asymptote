from collections import Counter

class Solution:
    def minSteps(self, s: str, t: str) -> int:
        cs, ct = Counter(s), Counter(t)
        return sum(max(0, count - ct[ch]) for ch, count in cs.items())

def test():
    sol = Solution()
    assert sol.minSteps("bab", "aba") == 1, "test 1 failed"
    assert sol.minSteps("leetcode", "practice") == 5, "test 2 failed"
    assert sol.minSteps("anagram", "mangaar") == 0, "test 3 failed"
    print("✓ minimum-number-of-steps-to-make-two-strings-anagram passed")

if __name__ == "__main__":
    test()
