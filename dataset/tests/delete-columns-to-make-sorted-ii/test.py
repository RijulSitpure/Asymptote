from typing import List

class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        n = len(strs)
        cols = len(strs[0])
        is_sorted = [False] * (n - 1)
        deleted = 0
        for c in range(cols):
            bad = False
            for i in range(n - 1):
                if not is_sorted[i] and strs[i][c] > strs[i + 1][c]:
                    bad = True
                    break
            if bad:
                deleted += 1
            else:
                for i in range(n - 1):
                    if strs[i][c] < strs[i + 1][c]:
                        is_sorted[i] = True
        return deleted

def test():
    sol = Solution()
    assert sol.minDeletionSize(["ca","bb","ac"]) == 1, "test 1 failed"
    assert sol.minDeletionSize(["xc","yb","za"]) == 0, "test 2 failed"
    assert sol.minDeletionSize(["zyx","wvu","tsr"]) == 3, "test 3 failed"
    print("✓ delete-columns-to-make-sorted-ii passed")

if __name__ == "__main__":
    test()
