class Solution:
    def kthSmallest(self, mat: list[list[int]], k: int) -> int:
        cur = [0]
        for row in mat:
            cur = sorted([x + y for x in cur for y in row])[:k]
        return cur[k - 1]

def test():
    sol = Solution()
    assert sol.kthSmallest([[1,3,11],[2,4,6]], 5) == 7, "test 1 failed"
    assert sol.kthSmallest([[1,3,11],[2,4,6]], 9) == 17, "test 2 failed"
    assert sol.kthSmallest([[1,10,10],[1,4,5],[2,3,6]], 7) == 9, "test 3 failed"
    print("✓ find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows passed")

if __name__ == "__main__":
    test()
