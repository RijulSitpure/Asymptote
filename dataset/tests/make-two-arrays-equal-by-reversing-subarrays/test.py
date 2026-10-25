from collections import Counter

class Solution:
    def canBeEqual(self, target: list[int], arr: list[int]) -> bool:
        return Counter(target) == Counter(arr)

def test():
    sol = Solution()
    assert sol.canBeEqual([1,2,3,4], [2,4,1,3]) == True, "test 1 failed"
    assert sol.canBeEqual([7], [7]) == True, "test 2 failed"
    assert sol.canBeEqual([3,7,9], [3,7,11]) == False, "test 3 failed"
    print("✓ make-two-arrays-equal-by-reversing-subarrays passed")

if __name__ == "__main__":
    test()
