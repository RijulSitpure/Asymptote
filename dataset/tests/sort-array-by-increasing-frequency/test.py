from collections import Counter

class Solution:
    def frequencySort(self, nums: list[int]) -> list[int]:
        counts = Counter(nums)
        return sorted(nums, key=lambda x: (counts[x], -x))

def test():
    sol = Solution()
    assert sol.frequencySort([1,1,2,2,2,3]) == [3,1,1,2,2,2]
    assert sol.frequencySort([2,3,1,3,2]) == [1,3,3,2,2]
    assert sol.frequencySort([-1,1,-6,4,5,-6,1,4,1]) == [5,-1,4,4,-6,-6,1,1,1]

    print("✓ sort-array-by-increasing-frequency passed")

if __name__ == '__main__':
    test()
