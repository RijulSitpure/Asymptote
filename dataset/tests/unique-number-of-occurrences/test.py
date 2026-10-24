from collections import Counter

class Solution:
    def uniqueOccurrences(self, arr: list[int]) -> bool:
        counts = Counter(arr).values()
        return len(counts) == len(set(counts))

def test():
    sol = Solution()
    assert sol.uniqueOccurrences([1, 2, 2, 1, 1, 3]) == True, "test 1 failed"
    assert sol.uniqueOccurrences([1, 2]) == False, "test 2 failed"
    assert sol.uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]) == True, "test 3 failed"
    print("✓ unique-number-of-occurrences passed")

if __name__ == "__main__":
    test()
