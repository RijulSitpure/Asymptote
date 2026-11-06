from collections import deque

def countSubarraysWithDistantSums(nums: list[int], threshold: int) -> int:
    n = len(nums)
    total = n * (n + 1) // 2
    if threshold <= 0:
        return total

    # Count subarrays with max - min < threshold
    max_dq = deque()
    min_dq = deque()
    left = 0
    narrow = 0

    for right in range(n):
        while max_dq and nums[max_dq[-1]] <= nums[right]:
            max_dq.pop()
        max_dq.append(right)

        while min_dq and nums[min_dq[-1]] >= nums[right]:
            min_dq.pop()
        min_dq.append(right)

        while nums[max_dq[0]] - nums[min_dq[0]] >= threshold:
            left += 1
            if max_dq[0] < left:
                max_dq.popleft()
            if min_dq[0] < left:
                min_dq.popleft()

        narrow += right - left + 1

    return total - narrow