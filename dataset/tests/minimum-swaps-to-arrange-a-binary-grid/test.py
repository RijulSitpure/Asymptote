class Solution:
    def minSwaps(self, grid: list[list[int]]) -> int:
        n = len(grid)
        zeros = []
        for row in grid:
            cnt = 0
            for x in reversed(row):
                if x == 0:
                    cnt += 1
                else:
                    break
            zeros.append(cnt)
        ans = 0
        for i in range(n):
            needed = n - 1 - i
            matched = -1
            for j in range(i, n):
                if zeros[j] >= needed:
                    matched = j
                    break
            if matched == -1:
                return -1
            ans += matched - i
            val = zeros.pop(matched)
            zeros.insert(i, val)
        return ans

def test():
    sol = Solution()
    assert sol.minSwaps([[0,0,1],[1,1,0],[1,0,0]]) == 3, "test 1 failed"
    assert sol.minSwaps([[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]) == -1, "test 2 failed"
    assert sol.minSwaps([[1,0,0],[1,1,0],[1,1,1]]) == 0, "test 3 failed"
    print("✓ minimum-swaps-to-arrange-a-binary-grid passed")

if __name__ == "__main__":
    test()
