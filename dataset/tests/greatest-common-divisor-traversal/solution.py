class Solution:
    def canTraverseAllPairs(self, nums: list[int]) -> bool:
        n = len(nums)
        if n == 1:
            return True
        if 1 in nums:
            return False
        parent = {}
        def find(x):
            if parent.setdefault(x, x) != x:
                parent[x] = find(parent[x])
            return parent[x]
        def union(x, y):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
        for x in nums:
            val = x
            d = 2
            while d * d <= val:
                if val % d == 0:
                    union(x, d)
                    while val % d == 0:
                        val //= d
                d += 1
            if val > 1:
                union(x, val)
        root = find(nums[0])
        return all(find(x) == root for x in nums)
