from typing import List

class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n + 1)]
        for u, v in paths:
            adj[u].append(v)
            adj[v].append(u)

        res = [0] * n
        for i in range(1, n + 1):
            used = {res[neighbor - 1] for neighbor in adj[i] if res[neighbor - 1] != 0}
            for color in (1, 2, 3, 4):
                if color not in used:
                    res[i - 1] = color
                    break
        return res

def test():
    sol = Solution()
    res1 = sol.gardenNoAdj(3, [[1,2],[2,3],[3,1]])
    assert len(res1) == 3, "test 1 length"
    assert res1[0] != res1[1] and res1[1] != res1[2] and res1[0] != res1[2], "test 1 adjacency"
    print("✓ flower-planting-with-no-adjacent passed")

if __name__ == "__main__":
    test()
