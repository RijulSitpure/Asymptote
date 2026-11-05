from collections import Counter

class Solution:
    def minDeletion(self, s: str, k: int) -> int:
        cnt = Counter(s)
        if len(cnt) <= k:
            return 0
        freqs = sorted(cnt.values())
        return sum(freqs[:len(freqs) - k])

def run_tests():
    s = Solution()
    res = s.minDeletion("abc", 2)
    assert res == 1, f"Expected 1, got {res}"
    print("3545 minimum-deletions-for-at-most-k-distinct-characters PASSED")

if __name__ == "__main__":
    run_tests()
