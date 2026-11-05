def maxScore(nums1: list[int], nums2: list[int], k: int) -> int:
    n1, n2 = len(nums1), len(nums2)
    # dp[p][i][j] = max score using p pairs from nums1[:i] and nums2[:j]
    # Space-optimized to 2D: dp[p][j] max score with p pairs using a prefix of nums2
    prev = [[-float('inf')] * (n2 + 1) for _ in range(k + 1)]
    for j in range(n2 + 1):
        prev[0][j] = 0
    for i in range(1, n1 + 1):
        cur = [row[:] for row in prev]
        v1 = nums1[i - 1]
        for p in range(1, min(k, i) + 1):
            for j in range(p, n2 + 1):
                v2 = nums2[j - 1]
                if prev[p - 1][j - 1] != -float('inf'):
                    cur[p][j] = max(cur[p][j], prev[p - 1][j - 1] + v1 * v2)
                cur[p][j] = max(cur[p][j], cur[p][j - 1])
        prev = cur
    return prev[k][n2]