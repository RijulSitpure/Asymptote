from collections import Counter

class Solution:
    def isPossibleDivide(self, nums: list[int], k: int) -> bool:
        if len(nums) % k != 0:
            return False
        counts = Counter(nums)
        for x in sorted(counts):
            if counts[x] > 0:
                need = counts[x]
                for i in range(k):
                    if counts[x + i] < need:
                        return False
                    counts[x + i] -= need
        return True

def test():
    sol = Solution()
    assert sol.isPossibleDivide([1,2,3,3,4,4,5,6], 4) == True, "test 1 failed"
    assert sol.isPossibleDivide([3,2,1,2,3,4,3,4,5,9,10,11], 3) == True, "test 2 failed"
    assert sol.isPossibleDivide([1,2,3,4], 3) == False, "test 3 failed"
    print("✓ divide-array-in-sets-of-k-consecutive-numbers passed")

if __name__ == "__main__":
    test()
