def minMergedInteger(nums: list[int]) -> int:
    ans = float('inf')
    for i in range(0, len(nums), 2):
        merged = int(f"{nums[i]}{nums[i + 1]}")
        ans = min(ans, merged)
    return ans
