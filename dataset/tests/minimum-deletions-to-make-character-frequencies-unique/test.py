from collections import Counter

class Solution:
    def minDeletions(self, s: str) -> int:
        counts = Counter(s)
        used = set()
        deletions = 0
        for freq in counts.values():
            while freq > 0 and freq in used:
                freq -= 1
                deletions += 1
            if freq > 0:
                used.add(freq)
        return deletions

def test():
    sol = Solution()
    assert sol.minDeletions("aab") == 0
    assert sol.minDeletions("aaabbbcc") == 2
    assert sol.minDeletions("ceabaacb") == 2

    print("✓ minimum-deletions-to-make-character-frequencies-unique passed")

if __name__ == '__main__':
    test()
