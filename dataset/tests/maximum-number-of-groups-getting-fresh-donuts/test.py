from collections import Counter
from functools import lru_cache

class Solution:
    def maxHappyGroups(self, batchSize: int, groups: list[int]) -> int:
        counts = [0] * batchSize
        for g in groups:
            counts[g % batchSize] += 1

        ans = counts[0]

        for i in range(1, (batchSize // 2) + 1):
            if i == batchSize - i:
                pairs = counts[i] // 2
                ans += pairs
                counts[i] -= pairs * 2
            else:
                pairs = min(counts[i], counts[batchSize - i])
                ans += pairs
                counts[i] -= pairs
                counts[batchSize - i] -= pairs

        @lru_cache(None)
        def dfs(rem: int, state: tuple) -> int:
            res = 0
            curr_state = list(state)
            for i in range(1, batchSize):
                if curr_state[i] > 0:
                    curr_state[i] -= 1
                    gained = 1 if rem == 0 else 0
                    nxt_rem = (rem + i) % batchSize
                    res = max(res, gained + dfs(nxt_rem, tuple(curr_state)))
                    curr_state[i] += 1
            return res

        return ans + dfs(0, tuple(counts))

def test():
    sol = Solution()
    assert sol.maxHappyGroups(3, [1,2,3,4,5,6]) == 4
    assert sol.maxHappyGroups(4, [1,3,2,5,2,2,1,6]) == 4

if __name__ == '__main__':
    test()
