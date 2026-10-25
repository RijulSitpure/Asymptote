from collections import defaultdict

class Solution:
    def restoreArray(self, adjacentPairs: list[list[int]]) -> list[int]:
        adj = defaultdict(list)
        for u, v in adjacentPairs:
            adj[u].append(v)
            adj[v].append(u)

        start = None
        for node, neighbors in adj.items():
            if len(neighbors) == 1:
                start = node
                break

        n = len(adjacentPairs) + 1
        res = [start]
        prev = None
        curr = start
        for _ in range(n - 1):
            nxt = adj[curr][0] if adj[curr][0] != prev else adj[curr][1]
            res.append(nxt)
            prev = curr
            curr = nxt
        return res

def test():
    sol = Solution()
    res1 = sol.restoreArray([[2,1],[3,4],[3,2]])
    assert res1 == [1,2,3,4] or res1 == [4,3,2,1]
    res2 = sol.restoreArray([[4,-2],[1,4],[-3,1]])
    assert res2 == [-2,4,1,-3] or res2 == [-3,1,4,-2]

    print("✓ restore-the-array-from-adjacent-pairs passed")

if __name__ == '__main__':
    test()
