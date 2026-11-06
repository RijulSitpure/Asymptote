def countRotationsWithKAdjacentPairs(nums: list[int], k: int) -> int:
    n = len(nums)
    if n <= 1:
        return 1 if k == 0 else 0

    extended = nums + nums
    # indicator of adjacent equals: match[i] = 1 if extended[i] == extended[i+1] else 0
    matches = [1 if extended[i] == extended[i + 1] else 0 for i in range(2 * n - 1)]

    # Each rotation of length n contains n - 1 adjacent pairs
    curr = sum(matches[:n - 1])
    ans = 1 if curr == k else 0

    for i in range(1, n):
        curr += matches[i + n - 2] - matches[i - 1]
        if curr == k:
            ans += 1
    return ans