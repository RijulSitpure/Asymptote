from collections import defaultdict

class Solution:
    def componentValue(self, nums: list[int], edges: list[list[int]]) -> int:
        total_sum = sum(nums)
        max_val = max(nums)
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        def check(target):
            valid = True
            def dfs(node, parent):
                nonlocal valid
                if not valid:
                    return 0
                s = nums[node]
                for nxt in adj[node]:
                    if nxt != parent:
                        s += dfs(nxt, node)
                if s > target:
                    valid = False
                return 0 if s == target else s
            
            res = dfs(0, -1)
            return valid and res == 0
        
        for parts in range(len(nums), 1, -1):
            if total_sum % parts == 0:
                target = total_sum // parts
                if target >= max_val and check(target):
                    return parts - 1
        return 0
