def validKUniqueSubarraysWithMinSum(nums: list[int], k: int, min_sum: int) -> int:
    n = len(nums)
    left = 0
    freq = {}
    curr_sum = 0
    valid_count = 0

    for right in range(n):
        x = nums[right]
        freq[x] = freq.get(x, 0) + 1
        curr_sum += x

        while len(freq) > k:
            y = nums[left]
            freq[y] -= 1
            if freq[y] == 0:
                del freq[y]
            curr_sum -= y
            left += 1

        # Now window [left, right] has <= k distinct
        # We need subarrays ending at right with sum >= min_sum
        # Since all nums > 0, we can find boundary with binary search or prefix sum
        pass

    # Standard clean implementation: count subarrays with <= k distinct elements having sum >= min_sum
    # Using prefix sums and at-most window:
    ans = 0
    for r in range(n):
        f = {}
        s = 0
        for l in range(r, -1, -1):
            f[nums[l]] = f.get(nums[l], 0) + 1
            if len(f) > k:
                break
            s += nums[l]
            if s >= min_sum:
                ans += 1
    return ans