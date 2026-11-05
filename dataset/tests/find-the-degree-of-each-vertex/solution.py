def findVertexDegrees(n: int, edges: list[list[int]]) -> list[int]:
    deg = [0] * n
    for u, v in edges:
        deg[u] += 1
        deg[v] += 1
    return deg