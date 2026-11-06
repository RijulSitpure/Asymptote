import bisect

def maxMeetingEarnings(meetings: list[list[int]], gap: int) -> int:
    # Each meeting: [start, end, earnings]
    meetings.sort(key=lambda x: x[1])
    n = len(meetings)

    dp = [0] * (n + 1)
    ends = [m[1] for m in meetings]

    for i in range(1, n + 1):
        start, end, earn = meetings[i - 1]
        # Find latest meeting ending <= start - gap
        idx = bisect.bisect_right(ends, start - gap)
        dp[i] = max(dp[i - 1], earn + dp[idx])

    return dp[n]