class Solution:
    def countSubTrees(self, n: int, edges: list[list[int]], labels: str) -> list[int]:
        import sys
        sys.setrecursionlimit(200000)
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        ans = [0] * n
        def dfs(u, parent):
            counts = [0] * 26
            u_label = ord(labels[u]) - ord("a")
            counts[u_label] = 1
            for v in graph[u]:
                if v != parent:
                    child_counts = dfs(v, u)
                    for i in range(26):
                        counts[i] += child_counts[i]
            ans[u] = counts[u_label]
            return counts
        dfs(0, -1)
        return ans

def test():
    sol = Solution()
    assert sol.countSubTrees(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], "abaedcd") == [2,1,1,1,1,1,1], "test 1 failed"
    assert sol.countSubTrees(4, [[0,1],[1,2],[0,3]], "bbbb") == [4,2,1,1], "test 2 failed"
    assert sol.countSubTrees(5, [[0,1],[0,2],[1,3],[0,4]], "aabab") == [3,2,1,1,1], "test 3 failed"
    print("✓ number-of-nodes-in-the-sub-tree-with-the-same-label passed")

if __name__ == "__main__":
    test()
