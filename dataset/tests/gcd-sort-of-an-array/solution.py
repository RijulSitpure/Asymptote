class Solution:
    def gcdSort(self, nums: list[int]) -> bool:
        max_val = max(nums)
        parent = list(range(max_val + 1))
        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]
        def union(i, j):
            root_i, root_j = find(i), find(j)
            if root_i != root_j:
                parent[root_i] = root_j
                
        for x in nums:
            temp = x
            d = 2
            while d * d <= temp:
                if temp % d == 0:
                    union(x, d)
                    while temp % d == 0:
                        temp //= d
                d += 1
            if temp > 1:
                union(x, temp)
                
        sorted_nums = sorted(nums)
        for a, b in zip(nums, sorted_nums):
            if find(a) != find(b):
                return False
        return True
