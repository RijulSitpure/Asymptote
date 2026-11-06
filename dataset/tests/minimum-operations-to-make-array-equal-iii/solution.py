def minOperationsToMakeEqual(nums: list[int], k: int) -> int:
    rem = nums[0] % k
    if any(x % k != rem for x in nums):
        return -1
    scaled = sorted(x // k for x in nums)
    median = scaled[len(scaled) // 2]
    return sum(abs(v - median) for v in scaled)