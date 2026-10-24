from typing import List

class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        deleted = 0
        rows = len(strs)
        cols = len(strs[0])
        for col in range(cols):
            for row in range(1, rows):
                if strs[row][col] < strs[row - 1][col]:
                    deleted += 1
                    break
        return deleted

def test():
    sol = Solution()
    assert sol.minDeletionSize(["cba","daf","ghi"]) == 1, "test 1 failed"
    assert sol.minDeletionSize(["a","b"]) == 0, "test 2 failed"
    assert sol.minDeletionSize(["zyx","wvu","tsr"]) == 3, "test 3 failed"
    print("✓ delete-columns-to-make-sorted passed")

if __name__ == "__main__":
    test()
