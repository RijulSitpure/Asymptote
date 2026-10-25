from collections import Counter

class Solution:
    def sumOfUnique(self, nums: list[int]) -> int:
        freq = Counter(nums)
        return sum(x for x, count in freq.items() if count == 1)

def test():
    sol = Solution()
    assert sol.sumOfUnique([1,2,3,2]) == 4
    assert sol.sumOfUnique([1,1,1,1,1]) == 0
    assert sol.sumOfUnique([1,2,3,4,5]) == 15

    print("✓ sum-of-unique-elements passed")

if __name__ == '__main__':
    test()
