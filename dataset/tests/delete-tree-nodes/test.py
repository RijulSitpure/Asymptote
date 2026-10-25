class Solution:
    def deleteTreeNodes(self, nodes: int, parent: list[int], value: list[int]) -> int:
        from collections import defaultdict
        adj = defaultdict(list)
        for i, p in enumerate(parent):
            if p != -1:
                adj[p].append(i)
                
        def dfs(u):
            total_sum = value[u]
            total_count = 1
            for v in adj[u]:
                sub_sum, sub_cnt = dfs(v)
                total_sum += sub_sum
                total_count += sub_cnt
            if total_sum == 0:
                return 0, 0
            return total_sum, total_count
            
        _, ans = dfs(0)
        return ans

def test():
    sol = Solution()
    nodes = 7
    p = [-1,0,0,1,2,2,2]
    val = [1,-2,4,0,-2,-1,-1]
    assert sol.deleteTreeNodes(nodes, p, val) == 2, "test 1 failed"
    print("✓ delete-tree-nodes passed")

if __name__ == "__main__":
    test()
