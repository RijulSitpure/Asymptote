from bisect import bisect_left, insort

def countSmallerWithOppositeParity(nums: list[int]) -> list[int]:
    n = len(nums)
    ans = [0] * n
    even_seen = []
    odd_seen = []
    for i in range(n - 1, -1, -1):
        val = nums[i]
        if val % 2 == 0:
            ans[i] = bisect_left(odd_seen, val)
            insort(even_seen, val)
        else:
            ans[i] = bisect_left(even_seen, val)
            insort(odd_seen, val)
    return ans