class Solution:
    def maxSideLength(self, mat: list[list[int]], threshold: int) -> int:
        m, n = len(mat), len(mat[0])
        pref = [[0] * (n + 1) for _ in range(m + 1)]
        for r in range(m):
            for c in range(n):
                pref[r + 1][c + 1] = mat[r][c] + pref[r][c + 1] + pref[r + 1][c] - pref[r][c]
        def query(r1, c1, r2, c2):
            return pref[r2][c2] - pref[r1][c2] - pref[r2][c1] + pref[r1][c1]
        lo, hi = 0, min(m, n)
        ans = 0
        while lo <= hi:
            mid = (lo + hi) // 2
            if mid == 0:
                lo = mid + 1
                continue
            found = False
            for r in range(m - mid + 1):
                for c in range(n - mid + 1):
                    if query(r, c, r + mid, c + mid) <= threshold:
                        found = True
                        break
                if found:
                    break
            if found:
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans

def test():
    sol = Solution()
    assert sol.maxSideLength([[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], 4) == 2, "test 1 failed"
    assert sol.maxSideLength([[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], 1) == 0, "test 2 failed"
    print("✓ maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold passed")

if __name__ == "__main__":
    test()
