class Solution:
    def largestEvenSum(self, nums: list[int], k: int) -> int:
        nums.sort(reverse=True)
        chosen = nums[:k]
        curr_sum = sum(chosen)

        if curr_sum % 2 == 0:
            return curr_sum

        min_odd_chosen = min((x for x in chosen if x % 2 == 1), default=None)
        min_even_chosen = min((x for x in chosen if x % 2 == 0), default=None)

        rest = nums[k:]
        max_even_rest = max((x for x in rest if x % 2 == 0), default=None)
        max_odd_rest = max((x for x in rest if x % 2 == 1), default=None)

        ans = -1
        if min_odd_chosen is not None and max_even_rest is not None:
            ans = max(ans, curr_sum - min_odd_chosen + max_even_rest)
        if min_even_chosen is not None and max_odd_rest is not None:
            ans = max(ans, curr_sum - min_even_chosen + max_odd_rest)

        return ans
