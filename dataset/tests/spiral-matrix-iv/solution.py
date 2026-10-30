class Solution:
    def spiralMatrix(self, m: int, n: int, head) -> list[list[int]]:
        res = [[-1] * n for _ in range(m)]
        top, bottom, left, right = 0, m - 1, 0, n - 1
        cur = head
        while cur and top <= bottom and left <= right:
            for c in range(left, right + 1):
                if not cur: break
                res[top][c] = cur.val
                cur = cur.next
            top += 1
            for r in range(top, bottom + 1):
                if not cur: break
                res[r][right] = cur.val
                cur = cur.next
            right -= 1
            for c in range(right, left - 1, -1):
                if not cur or top > bottom: break
                res[bottom][c] = cur.val
                cur = cur.next
            bottom -= 1
            for r in range(bottom, top - 1, -1):
                if not cur or left > right: break
                res[r][left] = cur.val
                cur = cur.next
            left += 1
        return res
