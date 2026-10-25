from collections import deque

class Solution:
    def isPrintable(self, targetGrid: list[list[int]]) -> bool:
        m, n = len(targetGrid), len(targetGrid[0])
        colors = set()
        box = {}
        for r in range(m):
            for c in range(n):
                col = targetGrid[r][c]
                colors.add(col)
                if col not in box:
                    box[col] = [r, r, c, c]
                else:
                    b = box[col]
                    b[0] = min(b[0], r)
                    b[1] = max(b[1], r)
                    b[2] = min(b[2], c)
                    b[3] = max(b[3], c)
        adj = {c: set() for c in colors}
        in_degree = {c: 0 for c in colors}
        for col, (min_r, max_r, min_c, max_c) in box.items():
            for r in range(min_r, max_r + 1):
                for c in range(min_c, max_c + 1):
                    other = targetGrid[r][c]
                    if other != col and other not in adj[col]:
                        adj[col].add(other)
        for u in adj:
            for v in adj[u]:
                in_degree[v] += 1
        q = deque([c for c in colors if in_degree[c] == 0])
        count = 0
        while q:
            u = q.popleft()
            count += 1
            for v in adj[u]:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    q.append(v)
        return count == len(colors)

def test():
    sol = Solution()
    assert sol.isPrintable([[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]) == True
    assert sol.isPrintable([[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]) == True
    assert sol.isPrintable([[1,2,1],[2,1,2],[1,2,1]]) == False

    print("✓ strange-printer-ii passed")

if __name__ == '__main__':
    test()
