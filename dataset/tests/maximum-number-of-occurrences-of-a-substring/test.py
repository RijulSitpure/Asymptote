from collections import Counter

class Solution:
    def maxFreq(self, s: str, maxLetters: int, minSize: int, maxSize: int) -> int:
        counts = Counter()
        n = len(s)
        for i in range(n - minSize + 1):
            sub = s[i:i + minSize]
            if len(set(sub)) <= maxLetters:
                counts[sub] += 1
        return max(counts.values()) if counts else 0

def test():
    sol = Solution()
    assert sol.maxFreq("aababcaab", 2, 3, 4) == 2, "test 1 failed"
    assert sol.maxFreq("aaaa", 1, 3, 3) == 2, "test 2 failed"
    print("✓ maximum-number-of-occurrences-of-a-substring passed")

if __name__ == "__main__":
    test()
