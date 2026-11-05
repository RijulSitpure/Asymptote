from typing import List
from collections import defaultdict

class Solution:
    def minIncrements(self, n: int, edges: List[List[int]], weights: List[int]) -> int:
        adj = defaultdict(list)
        for i, (u, v) in enumerate(edges):
            w = weights[i]
            adj[u].append((v, w))
            adj[v].append((u, w))
            
        total_increments = 0
        
        # Returns max path length from u to any leaf in its subtree
        def dfs(u: int, p: int) -> int:
            nonlocal total_increments
            child_branch_lens = []
            
            for v, w in adj[u]:
                if v == p:
                    continue
                branch_len = w + dfs(v, u)
                child_branch_lens.append(branch_len)
                
            if not child_branch_lens:
                return 0
                
            max_len = max(child_branch_lens)
            for l in child_branch_lens:
                total_increments += (max_len - l)
            return max_len

        dfs(0, -1)
        return total_increments

def run_tests():
    s = Solution()
    res1 = s.minIncrements(3, [[0, 1], [0, 2]], [2, 5])
    assert res1 == 3, f"Expected 3, got {res1}" # increase edge (0,1) from 2 to 5 -> diff 3
    res2 = s.minIncrements(3, [[0, 1], [0, 2]], [4, 4])
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3593 minimum-increments-to-equalize-leaf-paths PASSED")

if __name__ == "__main__":
    run_tests()
