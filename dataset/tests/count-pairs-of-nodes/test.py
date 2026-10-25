from collections import defaultdict

class Solution:
    def countPairs(self, n: int, edges: list[list[int]], queries: list[int]) -> list[int]:
        deg = [0] * (n + 1)
        shared = defaultdict(int)
        for u, v in edges:
            deg[u] += 1
            deg[v] += 1
            if u > v:
                u, v = v, u
            shared[(u, v)] += 1

        sorted_deg = sorted(deg[1:])
        ans = []

        for q in queries:
            count = 0
            l, r = 0, n - 1
            while l < r:
                if sorted_deg[l] + sorted_deg[r] > q:
                    count += (r - l)
                    r -= 1
                else:
                    l += 1

            for (u, v), edge_count in shared.items():
                if deg[u] + deg[v] > q and deg[u] + deg[v] - edge_count <= q:
                    count -= 1

            ans.append(count)

        return ans

def test():
    sol = Solution()
    assert sol.countPairs(4, [[1,2],[2,4],[1,3],[2,3],[2,1]], [2,3]) == [6,5]
    assert sol.countPairs(5, [[1,5],[1,5],[3,4],[2,5],[1,3],[5,1],[2,3],[2,5]], [1,2,3,4,5]) == [10,10,9,8,6]

    print("✓ count-pairs-of-nodes passed")

if __name__ == '__main__':
    test()
