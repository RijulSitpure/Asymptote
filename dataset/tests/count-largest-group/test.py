from collections import Counter

class Solution:
    def countLargestGroup(self, n: int) -> int:
        counts = Counter()
        for x in range(1, n + 1):
            s = sum(int(ch) for ch in str(x))
            counts[s] += 1
        max_size = max(counts.values())
        return sum(1 for sz in counts.values() if sz == max_size)

def test():
    sol = Solution()
    assert sol.countLargestGroup(13) == 4, "test 1 failed"
    assert sol.countLargestGroup(2) == 2, "test 2 failed"
    print("✓ count-largest-group passed")

if __name__ == "__main__":
    test()
