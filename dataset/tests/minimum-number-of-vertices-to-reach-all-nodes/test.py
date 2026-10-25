class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: list[list[int]]) -> list[int]:
        has_incoming = set()
        for u, v in edges:
            has_incoming.add(v)
        return [i for i in range(n) if i not in has_incoming]

def test():
    sol = Solution()
    assert sol.findSmallestSetOfVertices(6, [[0,1],[0,2],[2,5],[3,4],[4,2]]) == [0,3], "test 1 failed"
    assert sol.findSmallestSetOfVertices(5, [[0,1],[2,1],[3,1],[1,4],[2,4]]) == [0,2,3], "test 2 failed"
    print("✓ minimum-number-of-vertices-to-reach-all-nodes passed")

if __name__ == "__main__":
    test()
