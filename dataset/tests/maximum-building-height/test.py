class Solution:
    def maxBuilding(self, n: int, restrictions: list[list[int]]) -> int:
        r = restrictions + [[1, 0], [n, n - 1]]
        r.sort()

        dedup = []
        for id_val, h in r:
            if dedup and dedup[-1][0] == id_val:
                dedup[-1][1] = min(dedup[-1][1], h)
            else:
                dedup.append([id_val, h])
        r = dedup
        m = len(r)

        for i in range(1, m):
            r[i][1] = min(r[i][1], r[i - 1][1] + (r[i][0] - r[i - 1][0]))

        for i in range(m - 2, -1, -1):
            r[i][1] = min(r[i][1], r[i + 1][1] + (r[i + 1][0] - r[i][0]))

        ans = 0
        for i in range(m - 1):
            id1, h1 = r[i]
            id2, h2 = r[i + 1]
            peak = (h1 + h2 + (id2 - id1)) // 2
            ans = max(ans, peak)

        return ans

def test():
    sol = Solution()
    assert sol.maxBuilding(5, [[2,1],[4,1]]) == 2
    assert sol.maxBuilding(6, []) == 5
    assert sol.maxBuilding(10, [[5,3],[2,5],[7,4],[10,3]]) == 5

if __name__ == '__main__':
    test()
