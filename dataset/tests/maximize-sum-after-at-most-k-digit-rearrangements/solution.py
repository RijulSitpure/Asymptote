def maximizeSum(nums: list[int], k: int) -> int:
    gains = []
    for x in nums:
        rearranged = int(''.join(sorted(str(x), reverse=True)))
        gains.append(rearranged - x)
    gains.sort(reverse=True)
    return sum(nums) + sum(max(0, g) for g in gains[:k])
