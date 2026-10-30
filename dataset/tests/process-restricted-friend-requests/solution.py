class Solution:
    def friendRequests(self, n: int, restrictions: list[list[int]], requests: list[list[int]]) -> list[bool]:
        parent = list(range(n))

        def find(i: int) -> int:
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]

        res = []
        for u, v in requests:
            ru = find(u)
            rv = find(v)
            if ru == rv:
                res.append(True)
                continue

            valid = True
            for x, y in restrictions:
                rx = find(x)
                ry = find(y)
                if (rx == ru and ry == rv) or (rx == rv and ry == ru):
                    valid = False
                    break

            if valid:
                parent[ru] = rv
                res.append(True)
            else:
                res.append(False)

        return res
