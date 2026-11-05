from collections import Counter, defaultdict

class Solution:
    def totalInteractionCost(self, n: int, edges: list[list[int]], groups: list[int]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        total_counts = Counter(groups)
        total_cost = 0
        
        def dfs(u: int, p: int) -> dict[int, int]:
            nonlocal total_cost
            sub_counts = defaultdict(int)
            sub_counts[groups[u]] += 1
            
            for v in adj[u]:
                if v != p:
                    child_counts = dfs(v, u)
                    for g, cnt in child_counts.items():
                        total_cost += cnt * (total_counts[g] - cnt)
                        sub_counts[g] += cnt
            return sub_counts
        
        dfs(0, -1)
        return total_cost

def run_tests():
    sol = Solution()
    # 3 nodes: 0 - 1 - 2. groups = [1, 1, 1]. All in group 1.
    # Edge (0, 1): splits into {0} (1 node) and {1, 2} (2 nodes) -> 1 * 2 = 2.
    # Edge (1, 2): splits into {2} (1 node) and {0, 1} (2 nodes) -> 1 * 2 = 2.
    # Total = 4.
    assert sol.totalInteractionCost(3, [[0, 1], [1, 2]], [1, 1, 1]) == 4
    # All nodes distinct groups: total cost = 0
    assert sol.totalInteractionCost(2, [[0, 1]], [1, 2]) == 0
    print("All tests passed for 3786.")

if __name__ == "__main__":
    run_tests()
