def findTreeRoot(n: int, edges: list[list[int]], colors: list[int]) -> int:
    indegree = [0] * n
    for u, v in edges:
        indegree[v] += 1

    for i in range(n):
        if indegree[i] == 0:
            return i
    return -1