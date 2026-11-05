from typing import List
from collections import defaultdict

class Solution:
    def findWeightedMedian(self, n: int, edges: List[List[int]], weights: List[int], queries: List[List[int]]) -> List[int]:
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
        for u, v in queries:
            path = get_path(u, v)
            total_weight = sum(weights[node] for node in path)
            half = (total_weight + 1) // 2
            running = 0
            median_node = path[-1]
            for node in path:
                running += weights[node]
                if running >= half:
                    median_node = node
                    break
            ans.append(median_node)
        return ans

def run_tests():
    s = Solution()
    res1 = s.findWeightedMedian(3, [[0, 1], [1, 2]], [1, 2, 1], [[0, 2]])
    assert res1 == [1], f"Expected [1], got {res1}"
    res2 = s.findWeightedMedian(4, [[0, 1], [1, 2], [2, 3]], [1, 1, 1, 1], [[0, 3]])
    assert res2 == [1], f"Expected [1], got {res2}"
    print("3585 find-weighted-median-node-in-tree PASSED")

if __name__ == "__main__":
    run_tests()
