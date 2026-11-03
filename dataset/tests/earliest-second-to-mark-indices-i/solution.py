class Solution:
    def earliestSecondToMarkIndices(self, nums: list[int], changeIndices: list[int]) -> int:
        def check(t: int) -> bool:
            decrement = 0
            marked = 0
            last = {i: s for s, i in enumerate(changeIndices[:t])}
            for s, i in enumerate(changeIndices[:t]):
                if last[i] == s:
                    if decrement < nums[i - 1]:
                        return False
                    decrement -= nums[i - 1]
                    marked += 1
                else:
                    decrement += 1
            return marked == len(nums)

        m = len(changeIndices)
        l, r = 1, m
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if check(mid):
                ans = mid
                r = mid - 1
            else:
                l = mid + 1
        return ans
