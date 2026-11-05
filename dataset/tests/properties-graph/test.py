class Solution:
    def numberOfComponents(self, properties: list[list[int]], k: int) -> int:
        n = len(properties)
        sets = [set(p) for p in properties]
        adj = [[] for _ in range(n)]

        for i in range(n):
            for j in range(i + 1, n):
                if len(sets[i] & sets[j]) >= k:
                    adj[i].append(j)
                    adj[j].append(i)

        visited = [False] * n
        components = 0

        for i in range(n):
            if not visited[i]:
                components += 1
                visited[i] = True
                stack = [i]
                while stack:
                    curr = stack.pop()
                    for neighbor in adj[curr]:
                        if not visited[neighbor]:
                            visited[neighbor] = True
                            stack.append(neighbor)

        return components

def run_tests():
    s = Solution()
    assert s.numberOfComponents([[1, 2], [2, 3], [4, 5]], 1) == 2
    assert s.numberOfComponents([[1, 2, 3], [2, 3, 4], [3, 4, 5]], 2) == 1
    print("All tests passed for properties-graph")

if __name__ == '__main__':
    run_tests()
