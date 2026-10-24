from collections import deque

class Solution:
    def minimumSemesters(self, n: int, relations: list[list[int]]) -> int:
        adj = [[] for _ in range(n + 1)]
        in_degree = [0] * (n + 1)
        for u, v in relations:
            adj[u].append(v)
            in_degree[v] += 1
        
        q = deque([i for i in range(1, n + 1) if in_degree[i] == 0])
        semesters = 0
        taken = 0
        
        while q:
            semesters += 1
            for _ in range(len(q)):
                node = q.popleft()
                taken += 1
                for nxt in adj[node]:
                    in_degree[nxt] -= 1
                    if in_degree[nxt] == 0:
                        q.append(nxt)
        
        return semesters if taken == n else -1

def test():
    sol = Solution()
    assert sol.minimumSemesters(3, [[1,3],[2,3]]) == 2, "test 1 failed"
    assert sol.minimumSemesters(3, [[1,2],[2,3],[3,1]]) == -1, "test 2 failed"
    print("✓ parallel-courses passed")

if __name__ == "__main__":
    test()
