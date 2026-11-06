from collections import Counter

def totalInteractionCost(n: int, edges: list[list[int]], groups: list[int]) -> int:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    total_group_counts = Counter(groups)
    num_groups = max(groups) + 1 if groups else 0
    ans = 0

    def dfs(u: int, p: int) -> list[int]:
        nonlocal ans
        sub_counts = [0] * num_groups
        sub_counts[groups[u]] += 1
        for v in adj[u]:
            if v != p:
                child_counts = dfs(v, u)
                for g in range(num_groups):
                    c = child_counts[g]
                    rem = total_group_counts[g] - c
                    ans += c * rem
                    sub_counts[g] += c
        return sub_counts

    dfs(0, -1)
    return ans