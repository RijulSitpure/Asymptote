class Solution:
    def smallestMissingValueSubtree(self, parents: list[int], nums: list[int]) -> list[int]:
        n = len(parents)
        ans = [1] * n
        if 1 not in nums:
            return ans
        
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parents[i]].append(i)
            
        visited_nodes = [False] * n
        seen_vals = set()
        
        def dfs(node):
            if visited_nodes[node]:
                return
            visited_nodes[node] = True
            seen_vals.add(nums[node])
            for child in children[node]:
                dfs(child)
                
        curr = nums.index(1)
        mex = 1
        while curr != -1:
            dfs(curr)
            while mex in seen_vals:
                mex += 1
            ans[curr] = mex
            curr = parents[curr]
            
        return ans
