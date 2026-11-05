from collections import deque

class Solution:
    def queryConversions(self, conversions: list[list[int]], queries: list[list[int]]) -> list[int]:
        MOD = 1_000_000_007
        n = len(conversions) + 1
        units = [0] * n
        units[0] = 1
        graph = [[] for _ in range(n)]
        for u, v, factor in conversions:
            graph[u].append((v, factor))
        q = deque([0])
        while q:
            u = q.popleft()
            for v, factor in graph[u]:
                units[v] = (units[u] * factor) % MOD
                q.append(v)

        ans = []
        for u, v in queries:
            ans.append((units[v] * pow(units[u], MOD - 2, MOD)) % MOD)
        return ans

def run_tests():
    s = Solution()
    assert s.queryConversions([[0, 1, 2], [1, 2, 3]], [[1, 2], [0, 2]]) == [3, 6]
    print("All tests passed for unit-conversion-ii")

if __name__ == '__main__':
    run_tests()
