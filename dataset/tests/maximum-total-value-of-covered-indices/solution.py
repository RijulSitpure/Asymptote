def maxTotalValueCovered(nums: list[int], s: str) -> int:
    n = len(nums)
    covered = set()
    for i, c in enumerate(s):
        if c == '1':
            covered.add(i)
            if i - 1 >= 0 and nums[i - 1] > nums[i]:
                covered.add(i - 1)
            if i + 1 < n and nums[i + 1] > nums[i]:
                covered.add(i + 1)
    return sum(nums[i] for i in covered)