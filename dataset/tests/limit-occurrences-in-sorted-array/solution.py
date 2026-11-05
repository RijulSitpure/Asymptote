def limitOccurrences(nums: list[int], k: int) -> list[int]:
    ans = []
    count = 0
    for i, x in enumerate(nums):
        if i > 0 and x == nums[i - 1]:
            count += 1
        else:
            count = 1
        if count <= k:
            ans.append(x)
    return ans