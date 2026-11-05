class Solution:
    def maxProfit(self, n: int, edges: list[list[int]], score: list[int]) -> int:
        need = [0] * n
        for u, v in edges:
            need[v] |= (1 << u)

        max_mask = 1 << n
        dp = [-1] * max_mask
        dp[0] = 0

        for mask in range(max_mask):
            if dp[mask] == -1:
                continue
            pos = bin(mask).count('1') + 1
            for i in range(n):
                if not (mask & (1 << i)):
                    if (mask & need[i]) == need[i]:
                        new_mask = mask | (1 << i)
                        val = dp[mask] + score[i] * pos
                        if val > dp[new_mask]:
                            dp[new_mask] = val
        return dp[max_mask - 1]

def run_tests():
    s = Solution()
    assert s.maxProfit(2, [[0, 1]], [10, 20]) == 50
    assert s.maxProfit(1, [], [15]) == 15
    print("All tests passed for maximum-profit-from-valid-topological-order-in-dag")

if __name__ == '__main__':
    run_tests()
