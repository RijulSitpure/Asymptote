import bisect

class TweetCounts:
    def __init__(self):
        self.tweets = {}

    def recordTweet(self, tweetName: str, time: int) -> None:
        if tweetName not in self.tweets:
            self.tweets[tweetName] = []
        bisect.insort(self.tweets[tweetName], time)

    def getTweetCountsPerFrequency(self, freq: str, tweetName: str, startTime: int, endTime: int) -> list[int]:
        delta = 60 if freq == "minute" else (3600 if freq == "hour" else 86400)
        times = self.tweets.get(tweetName, [])
        ans = []
        cur = startTime
        while cur <= endTime:
            nxt = min(cur + delta, endTime + 1)
            left = bisect.bisect_left(times, cur)
            right = bisect.bisect_left(times, nxt)
            ans.append(right - left)
            cur = nxt
        return ans

tc = TweetCounts()
tc.recordTweet("tweet3", 0)
tc.recordTweet("tweet3", 60)
tc.recordTweet("tweet3", 10)
assert tc.getTweetCountsPerFrequency("minute", "tweet3", 0, 59) == [2]
assert tc.getTweetCountsPerFrequency("minute", "tweet3", 0, 60) == [2, 1]
print("All tests passed successfully.")
