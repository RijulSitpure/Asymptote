class Solution:
    def minimumDistance(self, nums: list[int]) -> int:
        last1 = {}
        last2 = {}
        min_dist = float('inf')
        for i, x in enumerate(nums):
            if x in last2:
                min_dist = min(min_dist, i - last2[x])
            if x in last1:
                last2[x] = last1[x]
            last1[x] = i
        return min_dist if min_dist != float('inf') else -1

def run_tests():
    sol = Solution()
    assert sol.minimumDistance([1, 2, 1, 3, 1]) == 4
    assert sol.minimumDistance([1, 1, 1]) == 2
    assert sol.minimumDistance([1, 2, 3]) == -1
    print("All tests passed for 3741.")

if __name__ == "__main__":
    run_tests()