def maxSubarraySumAfterSwaps(nums: list[int], k: int) -> int:
    n = len(nums)
    best = -10**15
    for i in range(n):
        for j in range(i, n):
            inside = sorted(nums[i:j + 1])
            outside = sorted(nums[:i] + nums[j + 1:], reverse=True)
            cur_sum = sum(inside)
            swaps = min(k, len(inside), len(outside))
            for s in range(swaps):
                if outside[s] > inside[s]:
                    cur_sum += outside[s] - inside[s]
                else:
                    break
            best = max(best, cur_sum)
    return best