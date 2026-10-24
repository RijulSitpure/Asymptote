class Solution:
    def earliestAcq(self, logs: list[list[int]], n: int) -> int:
        logs.sort(key=lambda x: x[0])
        parent = list(range(n))
        components = n
        
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        for t, u, v in logs:
            pu, pv = find(u), find(v)
            if pu != pv:
                parent[pu] = pv
                components -= 1
                if components == 1:
                    return t
        return -1

def test():
    sol = Solution()
    logs1 = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]]
    assert sol.earliestAcq(logs1, 6) == 20190301, "test 1 failed"
    logs2 = [[0,2,0],[1,0,1],[3,0,3],[4,1,2],[7,3,1]]
    assert sol.earliestAcq(logs2, 4) == 3, "test 2 failed"
    print("✓ the-earliest-moment-when-everyone-become-friends passed")

if __name__ == "__main__":
    test()
