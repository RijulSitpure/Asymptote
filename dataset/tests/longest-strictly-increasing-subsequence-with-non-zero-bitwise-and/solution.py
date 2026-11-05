import bisect

def longestSubsequence(nums: list[int]) -> int:
    ans = 0
    for b in range(31):
        filtered = [x for x in nums if (x >> b) & 1]
        if not filtered:
            continue
        tails = []
        for x in filtered:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        ans = max(ans, len(tails))
    return ans