class Solution:
    def findPeakGrid(self, mat: list[list[int]]) -> list[int]:
        m, n = len(mat), len(mat[0])
        low, high = 0, m - 1

        while low <= high:
            mid = (low + high) // 2
            max_c = 0
            for c in range(1, n):
                if mat[mid][c] > mat[mid][max_c]:
                    max_c = c

            top_val = mat[mid - 1][max_c] if mid > 0 else -1
            bot_val = mat[mid + 1][max_c] if mid + 1 < m else -1

            if mat[mid][max_c] > top_val and mat[mid][max_c] > bot_val:
                return [mid, max_c]
            elif mat[mid][max_c] < top_val:
                high = mid - 1
            else:
                low = mid + 1

        return [-1, -1]

def test():
    sol = Solution()
    res1 = sol.findPeakGrid([[1,4],[3,2]])
    assert res1 in ([0,1], [1,0])
    res2 = sol.findPeakGrid([[10,20,15],[21,30,14],[7,16,32]])
    assert res2 in ([1,1], [2,2])

if __name__ == '__main__':
    test()
