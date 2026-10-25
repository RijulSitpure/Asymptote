from collections import Counter

class Solution:
    def numIdenticalPairs(self, nums: list[int]) -> int:
        counts = Counter(nums)
        return sum(c * (c - 1) // 2 for c in counts.values())

def test():
    sol = Solution()
    assert sol.numIdenticalPairs([1,2,3,1,1,3]) == 4, "test 1 failed"
    assert sol.numIdenticalPairs([1,1,1,1]) == 6, "test 2 failed"
    assert sol.numIdenticalPairs([1,2,3]) == 0, "test 3 failed"
    print("✓ number-of-good-pairs passed")

if __name__ == "__main__":
    test()
