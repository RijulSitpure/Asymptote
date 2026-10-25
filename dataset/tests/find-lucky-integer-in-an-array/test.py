from collections import Counter

class Solution:
    def findLucky(self, arr: list[int]) -> int:
        counts = Counter(arr)
        lucky = -1
        for num, freq in counts.items():
            if num == freq:
                lucky = max(lucky, num)
        return lucky

def test():
    sol = Solution()
    assert sol.findLucky([2,2,3,4]) == 2, "test 1 failed"
    assert sol.findLucky([1,2,2,3,3,3]) == 3, "test 2 failed"
    assert sol.findLucky([2,2,2,3,3]) == -1, "test 3 failed"
    print("✓ find-lucky-integer-in-an-array passed")

if __name__ == "__main__":
    test()
