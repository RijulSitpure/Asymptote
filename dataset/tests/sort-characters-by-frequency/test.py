import sys

class Solution:
    def frequencySort(self, s: str) -> str:
        from collections import Counter
        counts = Counter(s)
        return "".join(ch * cnt for ch, cnt in sorted(counts.items(), key=lambda x: x[1], reverse=True))

def test():
    sol = Solution()
    res1 = sol.frequencySort("tree")
    assert res1 in ("eert", "eetr"), "test 1 failed"
    res2 = sol.frequencySort("cccaaa")
    assert res2 in ("cccaaa", "aaaccc"), "test 2 failed"
    print("✓ sort-characters-by-frequency passed")

if __name__ == "__main__":
    test()
