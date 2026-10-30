class Solution:
    def solve(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        MOD = 10**9 + 7
        n = len(nums)
        B = int(n**0.5) + 1
        pre = [[0] * (n + 1) for _ in range(B)]
        for step in range(1, B):
            for i in range(n - 1, -1, -1):
                nxt = pre[step][i + step] if i + step < n else 0
                pre[step][i] = (nums[i] + nxt) % MOD
        ans = []
        for x, y in queries:
            if y < B:
                ans.append(pre[y][x])
            else:
                tot = 0
                curr = x
                while curr < n:
                    tot = (tot + nums[curr]) % MOD
                    curr += y
                ans.append(tot)
        return ans

sol = Solution()
assert sol.solve([0,1,2,3,4,5,6,7], [[0,3],[5,1],[4,2]]) == [9, 18, 10]
print("All tests passed successfully.")
