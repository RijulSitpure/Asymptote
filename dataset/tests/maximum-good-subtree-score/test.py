from typing import List
from collections import defaultdict

class Solution:
    def maxGoodSubtreeScore(self, values: List[int], edges: List[List[int]]) -> int:
        n = len(values)
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        def get_mask(val: int) -> int:
            mask = 0
            s = str(abs(val))
            for ch in s:
                mask |= (1 << (ord(ch) - ord('0')))
            return mask

        node_mask = [get_mask(v) for v in values]
        best_overall = max(0, max(values)) if values else 0

        # Subtree DP: dp[u] maps digit_mask -> max sum
        def dfs(u: int, p: int) -> dict:
            nonlocal best_overall
            dp = {node_mask[u]: values[u]}
            if values[u] > best_overall:
                best_overall = values[u]
                
            for v in adj[u]:
                if v == p:
                    continue
                child_dp = dfs(v, u)
                new_dp = dict(dp)
                for m1, s1 in dp.items():
                    for m2, s2 in child_dp.items():
                        if (m1 & m2) == 0:
                            combined_mask = m1 | m2
                            combined_sum = s1 + s2
                            if combined_mask not in new_dp or combined_sum > new_dp[combined_mask]:
                                new_dp[combined_mask] = combined_sum
                                if combined_sum > best_overall:
                                    best_overall = combined_sum
                dp = new_dp
            return dp

        dfs(0, -1)
        return best_overall

def run_tests():
    s = Solution()
    res1 = s.maxGoodSubtreeScore([12, 34, 56], [[0, 1], [0, 2]])
    assert res1 == 102, f"Expected 102, got {res1}" # 12 + 34 + 56 = 102 (digits 1,2,3,4,5,6 disjoint)
    res2 = s.maxGoodSubtreeScore([12, 23], [[0, 1]])
    assert res2 == 23, f"Expected 23, got {res2}" # digits overlap on 2
    print("3575 maximum-good-subtree-score PASSED")

if __name__ == "__main__":
    run_tests()
