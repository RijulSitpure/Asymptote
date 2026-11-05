from typing import List
from collections import defaultdict

class Solution:
    def kthSmallestPathXor(self, n: int, edges: List[List[int]], values: List[int], queries: List[List[int]]) -> List[int]:
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        def get_path(start: int, target: int) -> List[int]:
            parent = {start: None}
            queue = [start]
            visited = {start}
            for u in queue:
                if u == target:
                    break
                for v in adj[u]:
                    if v not in visited:
                        visited.add(v)
                        parent[v] = u
                        queue.append(v)
            path = []
            curr = target
            while curr is not None:
                path.append(curr)
                curr = parent[curr]
            return path[::-1]

        ans = []
        for u, v, k in queries:
            path = get_path(u, v)
            m = len(path)
            xor_sums = []
            for i in range(m):
                curr = 0
                for j in range(i, m):
                    curr ^= values[path[j]]
                    xor_sums.append(curr)
            xor_sums.sort()
            if k <= len(xor_sums):
                ans.append(xor_sums[k - 1])
            else:
                ans.append(-1)
        return ans

def run_tests():
    s = Solution()
    res1 = s.kthSmallestPathXor(3, [[0, 1], [1, 2]], [1, 2, 3], [[0, 2, 1]])
    assert res1 == [0], f"Expected [0], got {res1}" # 1^2^3 = 0, smallest subpath xor
    res2 = s.kthSmallestPathXor(2, [[0, 1]], [4, 5], [[0, 1, 10]])
    assert res2 == [-1], f"Expected [-1], got {res2}"
    print("3590 kth-smallest-path-xor-sum PASSED")

if __name__ == "__main__":
    run_tests()
