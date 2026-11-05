def countLocalMaximums(matrix: list[list[int]]) -> int:
    n = len(matrix)
    m = len(matrix[0])
    ans = 0
    for r in range(n):
        for c in range(m):
            x = matrix[r][c]
            if x == 0:
                continue
            is_max = True
            r_min = max(0, r - x)
            r_max = min(n - 1, r + x)
            c_min = max(0, c - x)
            c_max = min(m - 1, c + x)
            for nr in range(r_min, r_max + 1):
                for nc in range(c_min, c_max + 1):
                    if abs(nr - r) == x and abs(nc - c) == x:
                        continue
                    if matrix[nr][nc] > x:
                        is_max = False
                        break
                if not is_max:
                    break
            if is_max:
                ans += 1
    return ans