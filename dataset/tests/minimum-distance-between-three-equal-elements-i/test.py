from collections import defaultdict

class Solution:
    def minimumDistance(self, nums: list[int]) -> int:
        # Distance between 3 equal elements at i < j < k is k - i
        # Find minimum k - i
        pos = defaultdict(list)
        for i, x in enumerate(nums):
            pos[x].append(i)
        min_dist = float('inf')
        for indices in pos.values():
            if len(indices) >= 3:
                for p in range(len(indices) - 2):
                    min_dist = min(min_dist, indices[p + 2] - indices[p])
        return min_dist if min_dist != float('inf') else -1

def run_tests():
    sol = Solution()
    assert sol.minimumDistance([1, 2, 1, 3, 1]) == 4 # indices 0, 2, 4 -> 4 - 0 = 4
    assert sol.minimumDistance([1, 1, 1]) == 2 # 2 - 0 = 2
    assert sol.minimumDistance([1, 2, 3]) == -1
    print("All tests passed for 3740.")

if __name__ == "__main__":
    run_tests()