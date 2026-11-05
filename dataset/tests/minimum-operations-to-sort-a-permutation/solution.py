from collections import deque

def minOperationsToSort(nums: list[int]) -> int:
    n = len(nums)
    if n <= 1:
        return 0
    is_fwd = all(nums[i] == (nums[0] + i) % n for i in range(n))
    is_bwd = all(nums[i] == (nums[0] - i + n) % n for i in range(n))
    if not is_fwd and not is_bwd:
        return -1
    pos0 = nums.index(0)
    start_rev = 1 if (is_bwd and not is_fwd) else 0
    start_state = (pos0, start_rev)
    target_state = (0, 0)
    q = deque([(pos0, start_rev, 0)])
    vis = set([start_state])
    while q:
        p, rev, dist = q.popleft()
        if (p, rev) == target_state:
            return dist
        nxt1 = (n - 1 - p, 1 - rev)
        if nxt1 not in vis:
            vis.add(nxt1)
            q.append((nxt1[0], nxt1[1], dist + 1))
        nxt2 = ((p - 1 + n) % n, rev)
        if nxt2 not in vis:
            vis.add(nxt2)
            q.append((nxt2[0], nxt2[1], dist + 1))
    return -1