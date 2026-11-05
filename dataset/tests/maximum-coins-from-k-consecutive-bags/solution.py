class Solution:
    def maximumCoins(self, coins: list[list[int]], k: int) -> int:
        coins.sort(key=lambda x: x[0])
        
        def solve(arr: list[list[int]], length: int) -> int:
            n = len(arr)
            max_c = 0
            j = 0
            curr_c = 0
            for i in range(n):
                start = arr[i][0]
                end = start + length - 1
                while j < n and arr[j][0] <= end:
                    ol = max(start, arr[j][0])
                    orr = min(end, arr[j][1])
                    if ol <= orr:
                        curr_c += (orr - ol + 1) * arr[j][2]
                    j += 1
                max_c = max(max_c, curr_c)
                ol = max(start, arr[i][0])
                orr = min(end, arr[i][1])
                if ol <= orr:
                    curr_c -= (orr - ol + 1) * arr[i][2]
            return max_c

        ans = solve(coins, k)
        rev_coins = [[-r, -l, c] for l, r, c in reversed(coins)]
        ans = max(ans, solve(rev_coins, k))
        return ans
