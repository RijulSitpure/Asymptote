class Solution:
    def findPermutation(self, nums: list[int]) -> list[int]:
        n = len(nums)
        memo = {}
        best_pick = {}

        def get_score(last, mask):
            if mask == (1 << n) - 1:
                return abs(last - nums[0])
            key = (last, mask)
            if key in memo:
                return memo[key]

            min_score = float('inf')
            best_i = -1
            for i in range(1, n):
                if not (mask & (1 << i)):
                    score = abs(last - nums[i]) + get_score(i, mask | (1 << i))
                    if score < min_score:
                        min_score = score
                        best_i = i
            memo[key] = min_score
            best_pick[key] = best_i
            return min_score

        get_score(0, 1)

        res = [0]
        last = 0
        mask = 1
        for _ in range(n - 1):
            nxt = best_pick[(last, mask)]
            res.append(nxt)
            mask |= (1 << nxt)
            last = nxt
        return res
