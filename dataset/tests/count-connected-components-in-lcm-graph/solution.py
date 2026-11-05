class Solution:
    def countComponents(self, nums: list[int], threshold: int) -> int:
        parent = {}
        
        def find(i):
            if i not in parent:
                parent[i] = i
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]
            
        def union(i, j):
            root_i = find(i)
            root_j = find(j)
            if root_i != root_j:
                parent[root_i] = root_j
                
        for num in nums:
            if num <= threshold:
                for multiple in range(2 * num, threshold + 1, num):
                    union(num, multiple)
                    
        roots = set()
        for num in nums:
            roots.add(find(num))
        return len(roots)
