class Solution:
    def destroyTargets(self, nums: list[int], space: int) -> int:
        counts = {}
        min_num = {}
        for x in nums:
            rem = x % space
            counts[rem] = counts.get(rem, 0) + 1
            if rem not in min_num or x < min_num[rem]:
                min_num[rem] = x
        max_cnt = max(counts.values())
        ans = float('inf')
        for rem, cnt in counts.items():
            if cnt == max_cnt:
                ans = min(ans, min_num[rem])
        return ans
