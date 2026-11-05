from typing import List
from collections import defaultdict, deque

class Solution:
    def countRecoveryPathways(self, n: int, edges: List[List[int]]) -> int:
        MOD = 1_000_000_007
        adj = defaultdict(list)
        indegree = [0] * n
        for u, v in edges:
            adj[u].append(v)
            indegree[v] += 1
            
        dp = [0] * n
        dp[0] = 1
        queue = deque([i for i in range(n) if indegree[i] == 0])
        
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                dp[v] = (dp[v] + dp[u]) % MOD
                indegree[v] -= 1
                if indegree[v] == 0:
                    queue.append(v)
                    
        return dp[n - 1]

def run_tests():
    s = Solution()
    res1 = s.countRecoveryPathways(4, [[0, 1], [0, 2], [1, 3], [2, 3]])
    assert res1 == 2, f"Expected 2, got {res1}" # 0->1->3 and 0->2->3
    res2 = s.countRecoveryPathways(3, [[0, 1], [1, 2], [0, 2]])
    assert res2 == 2, f"Expected 2, got {res2}"
    print("3620 network-recovery-pathways PASSED")

if __name__ == "__main__":
    run_tests()
