from collections import deque

class Solution:
    def baseUnitConversions(self, conversions: list[list[int]]) -> list[int]:
        MOD = 1_000_000_007
        n = len(conversions) + 1
        ans = [0] * n
        ans[0] = 1
        graph = [[] for _ in range(n)]
        for u, v, factor in conversions:
            graph[u].append((v, factor))
        q = deque([0])
        while q:
            u = q.popleft()
            for v, factor in graph[u]:
                ans[v] = (ans[u] * factor) % MOD
                q.append(v)
        return ans

def run_tests():
    s = Solution()
    assert s.baseUnitConversions([[0, 1, 2], [1, 2, 3]]) == [1, 2, 6]
    print("All tests passed for unit-conversion-i")

if __name__ == '__main__':
    run_tests()
