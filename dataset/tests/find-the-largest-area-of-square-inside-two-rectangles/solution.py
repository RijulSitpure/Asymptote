class Solution:
    def largestSquareArea(self, bottomLeft: list[list[int]], topRight: list[list[int]]) -> int:
        ans = 0
        n = len(bottomLeft)
        for i in range(n):
            for j in range(i + 1, n):
                w = min(topRight[i][0], topRight[j][0]) - max(bottomLeft[i][0], bottomLeft[j][0])
                h = min(topRight[i][1], topRight[j][1]) - max(bottomLeft[i][1], bottomLeft[j][1])
                e = min(w, h)
                if e > 0:
                    ans = max(ans, e * e)
        return ans
