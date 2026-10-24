class Solution:
    def numberOfPatterns(self, m: int, n: int) -> int:
        skip = [[0] * 10 for _ in range(10)]
        skip[1][3] = skip[3][1] = 2
        skip[1][7] = skip[7][1] = 4
        skip[3][9] = skip[9][3] = 6
        skip[7][9] = skip[9][7] = 8
        skip[1][9] = skip[9][1] = skip[2][8] = skip[8][2] = 5
        skip[3][7] = skip[7][3] = skip[4][6] = skip[6][4] = 5

        visited = [False] * 10

        def dfs(curr: int, remain: int) -> int:
            if remain <= 0:
                return 0
            if remain == 1:
                return 1
            visited[curr] = True
            count = 0
            for next_key in range(1, 10):
                if not visited[next_key]:
                    mid = skip[curr][next_key]
                    if mid == 0 or visited[mid]:
                        count += dfs(next_key, remain - 1)
            visited[curr] = False
            return count

        total = 0
        for length in range(m, n + 1):
            total += dfs(1, length) * 4
            total += dfs(2, length) * 4
            total += dfs(5, length)
        return total

def test():
    sol = Solution()
    assert sol.numberOfPatterns(1, 1) == 9, "test 1 failed"
    assert sol.numberOfPatterns(1, 2) == 65, "test 2 failed"
    print("✓ android-unlock-patterns passed")

if __name__ == "__main__":
    test()
