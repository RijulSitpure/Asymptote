class Solution:
    def resultGrid(self, image: list[list[int]], threshold: int) -> list[list[int]]:
        m, n = len(image), len(image[0])
        val = [[0] * n for _ in range(m)]
        cnt = [[0] * n for _ in range(m)]
        
        for i in range(m - 2):
            for j in range(n - 2):
                ok = True
                s = 0
                for r in range(i, i + 3):
                    for c in range(j, j + 3):
                        s += image[r][c]
                        if r + 1 < i + 3 and abs(image[r][c] - image[r + 1][c]) > threshold:
                            ok = False
                        if c + 1 < j + 3 and abs(image[r][c] - image[r][c + 1]) > threshold:
                            ok = False
                if ok:
                    avg = s // 9
                    for r in range(i, i + 3):
                        for c in range(j, j + 3):
                            val[r][c] += avg
                            cnt[r][c] += 1
                            
        ans = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if cnt[i][j] > 0:
                    ans[i][j] = val[i][j] // cnt[i][j]
                else:
                    ans[i][j] = image[i][j]
        return ans
