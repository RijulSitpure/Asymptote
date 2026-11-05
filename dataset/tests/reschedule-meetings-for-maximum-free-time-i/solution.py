class Solution:
    def maxFreeTime(self, eventTime: int, k: int, startTime: list[int], endTime: list[int]) -> int:
        n = len(startTime)
        gaps = [startTime[0]]
        for i in range(1, n):
            gaps.append(startTime[i] - endTime[i - 1])
        gaps.append(eventTime - endTime[n - 1])
        
        curr = sum(gaps[:k + 1])
        ans = curr
        for i in range(k + 1, len(gaps)):
            curr += gaps[i] - gaps[i - (k + 1)]
            if curr > ans:
                ans = curr
        return ans
