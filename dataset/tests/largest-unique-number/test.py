from collections import Counter

class Solution:
    def largestUniqueNumber(self, nums: list[int]) -> int:
        counts = Counter(nums)
        uniques = [x for x, c in counts.items() if c == 1]
        return max(uniques) if uniques else -1

def test():
    sol = Solution()
    assert sol.largestUniqueNumber([5,7,3,9,4,9,8,3,1]) == 8, "test 1 failed"
    assert sol.largestUniqueNumber([9,9,8,8]) == -1, "test 2 failed"
    print("✓ largest-unique-number passed")

if __name__ == "__main__":
    test()
