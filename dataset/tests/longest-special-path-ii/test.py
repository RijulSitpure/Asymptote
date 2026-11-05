import sys

sys.setrecursionlimit(200000)

class Solution:
    def longestSpecialPath(self, edges: list[list[int]], nums: list[int]) -> list[int]:
        n = len(nums)
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))
            graph[v].append((u, w))

        max_length = 0
        min_nodes = 1

        prefix = [0]
        last_seen = {}

        def dfs(u: int, prev: int, left_boundary: list[int]) -> None:
            nonlocal max_length, min_nodes

            val = nums[u]
            prev_depth = last_seen.get(val, 0)
            last_seen[val] = len(prefix)

            if prev_depth != 0:
                left_boundary.append(prev_depth)
                left_boundary.sort()
                left_boundary = [left_boundary[-2], left_boundary[-1]]

            start_idx = left_boundary[0]
            length = prefix[-1] - prefix[start_idx]
            nodes = len(prefix) - start_idx

            if length > max_length:
                max_length = length
                min_nodes = nodes
            elif length == max_length:
                min_nodes = min(min_nodes, nodes)

            for v, w in graph[u]:
                if v != prev:
                    prefix.append(prefix[-1] + w)
                    dfs(v, u, list(left_boundary))
                    prefix.pop()

            last_seen[val] = prev_depth

        dfs(0, -1, [0, 0])
        return [max_length, min_nodes]

def run_tests():
    s = Solution()
    edges = [[0,1,1],[1,2,3],[1,3,1],[2,4,6],[4,7,2],[3,5,2],[3,6,5],[6,8,3]]
    nums = [1,1,0,3,1,2,1,1,0]
    assert s.longestSpecialPath(edges, nums) == [9, 3]

    edges2 = [[0,1,10],[1,2,10]]
    nums2 = [1,1,1]
    assert s.longestSpecialPath(edges2, nums2) == [10, 2]
    print("All tests passed for longest-special-path-ii")

if __name__ == '__main__':
    run_tests()
