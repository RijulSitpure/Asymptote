class Solution:
    def findCenter(self, edges: list[list[int]]) -> int:
        u1, v1 = edges[0]
        u2, v2 = edges[1]
        return u1 if u1 == u2 or u1 == v2 else v1

def test():
    sol = Solution()
    assert sol.findCenter([[1,2],[2,3],[4,2]]) == 2
    assert sol.findCenter([[1,2],[5,1],[1,3],[1,4]]) == 1

    print("✓ find-center-of-star-graph passed")

if __name__ == '__main__':
    test()
