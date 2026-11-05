from collections import deque

def countSubarrays(nums: list[int], k: int) -> int:
    min_q = deque()
    max_q = deque()
    ans = 0
    left = 0
    for right, val in enumerate(nums):
        while min_q and min_q[-1] > val:
            min_q.pop()
        min_q.append(val)
        while max_q and max_q[-1] < val:
            max_q.pop()
        max_q.append(val)
        while max_q[0] - min_q[0] > k:
            if min_q[0] == nums[left]:
                min_q.popleft()
            if max_q[0] == nums[left]:
                max_q.popleft()
            left += 1
        ans += (right - left + 1)
    return ans