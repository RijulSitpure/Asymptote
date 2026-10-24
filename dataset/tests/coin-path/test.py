from typing import List

class Solution:
    def cheapestJump(self, coins: List[int], maxJump: int) -> List[int]:
        n = len(coins)
        if coins[-1] == -1 or coins[0] == -1:
            return []

        cost = [float("inf")] * n
        nxt = [-1] * n
        cost[-1] = coins[-1]

        for i in range(n - 2, -1, -1):
            if coins[i] == -1:
                continue
            for j in range(i + 1, min(n, i + maxJump + 1)):
                if cost[j] != float("inf"):
                    total = coins[i] + cost[j]
                    if total < cost[i]:
                        cost[i] = total
                        nxt[i] = j

        if cost[0] == float("inf"):
            return []

        path = []
        curr = 0
        while curr != -1:
            path.append(curr + 1)
            curr = nxt[curr]

        return path

def test():
    sol = Solution()
    assert sol.cheapestJump([1, 2, 4, -1, 2], 2) == [1, 3, 5], "test 1 failed"
    assert sol.cheapestJump([1, 2, 4, -1, 2], 1) == [], "test 2 failed"
    print("✓ coin-path passed")

if __name__ == "__main__":
    test()
