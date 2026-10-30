import bisect

class Solution:
    def answerQueries(self, nums: list[int], queries: list[int]) -> list[int]:
        nums.sort()
        pref = []
        cur = 0
        for x in nums:
            cur += x
            pref.append(cur)
        return [bisect.bisect_right(pref, q) for q in queries]
