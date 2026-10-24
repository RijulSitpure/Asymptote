from typing import List

class Solution:
    def containVirus(self, isInfected: List[List[int]]) -> int:
        m, n = len(isInfected), len(isInfected[0])
        total_walls = 0

        while True:
            visited = set()
            regions = []
            threats = []
            walls_needed = []

            for r in range(m):
                for c in range(n):
                    if isInfected[r][c] == 1 and (r, c) not in visited:
                        region = []
                        threat = set()
                        walls = 0
                        stack = [(r, c)]
                        visited.add((r, c))
                        while stack:
                            cr, cc = stack.pop()
                            region.append((cr, cc))
                            for nr, nc in ((cr + 1, cc), (cr - 1, cc), (cr, cc + 1), (cr, cc - 1)):
                                if 0 <= nr < m and 0 <= nc < n:
                                    if isInfected[nr][nc] == 1 and (nr, nc) not in visited:
                                        visited.add((nr, nc))
                                        stack.append((nr, nc))
                                    elif isInfected[nr][nc] == 0:
                                        threat.add((nr, nc))
                                        walls += 1
                        regions.append(region)
                        threats.append(threat)
                        walls_needed.append(walls)

            if not regions:
                break

            idx = -1
            max_threat = 0
            for i in range(len(threats)):
                if len(threats[i]) > max_threat:
                    max_threat = len(threats[i])
                    idx = i

            if idx == -1:
                break

            total_walls += walls_needed[idx]
            for r, c in regions[idx]:
                isInfected[r][c] = 2

            for i in range(len(regions)):
                if i != idx:
                    for r, c in threats[i]:
                        isInfected[r][c] = 1

        return total_walls

def test():
    sol = Solution()
    g1 = [
        [0,1,0,0,0,0,0,1],
        [0,1,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0]
    ]
    assert sol.containVirus(g1) == 10, "test 1 failed"
    g2 = [[1,1,1],[1,0,1],[1,1,1]]
    assert sol.containVirus(g2) == 4, "test 2 failed"
    print("✓ contain-virus passed")

if __name__ == "__main__":
    test()
