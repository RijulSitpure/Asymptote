from collections import defaultdict
from typing import List

class Solution:
    def maxAlternatingSum(self, nums: List[int], pairs: List[List[int]]) -> int:
        n = len(nums)
        parent = list(range(n))
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        def union(x, y):
            root_x, root_y = find(x), find(y)
            if root_x != root_y:
                parent[root_x] = root_y
        for u, v in pairs:
            union(u, v)
        components = defaultdict(list)
        for i in range(n):
            components[find(i)].append(i)
        res = list(nums)
        for comp, indices in components.items():
            vals = sorted([nums[i] for i in indices], reverse=True)
            even_indices = [i for i in indices if i % 2 == 0]
            odd_indices = [i for i in indices if i % 2 == 1]
            for i, idx in enumerate(even_indices):
                res[idx] = vals[i]
            for i, idx in enumerate(odd_indices):
                res[idx] = vals[len(even_indices) + len(odd_indices) - 1 - i]
        return sum(res[i] if i % 2 == 0 else -res[i] for i in range(n))

def run_tests():
    sol = Solution()
    assert sol.maxAlternatingSum([1, 2, 3], [[0, 1], [1, 2]]) == 4 # can reorder [1,2,3] freely -> [3, 1, 2] -> 3 - 1 + 2 = 4
    assert sol.maxAlternatingSum([4, 2, 5], []) == 7 # 4 - 2 + 5 = 7
    print("All tests passed for 3695.")

if __name__ == "__main__":
    run_tests()
