class Solution:
    def kWeakestRows(self, mat: list[list[int]], k: int) -> list[int]:
        pairs = [(sum(row), i) for i, row in enumerate(mat)]
        pairs.sort()
        return [i for _, i in pairs[:k]]

def test():
    sol = Solution()
    assert sol.kWeakestRows([[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], 3) == [2,0,3], "test 1 failed"
    assert sol.kWeakestRows([[1,0,0,0],[1,1,1,1],[1,0,0,0],[1,0,0,0]], 2) == [0,2], "test 2 failed"
    print("✓ the-k-weakest-rows-in-a-matrix passed")

if __name__ == "__main__":
    test()
