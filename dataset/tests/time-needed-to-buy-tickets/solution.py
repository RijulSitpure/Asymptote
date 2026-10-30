class Solution:
    def timeRequiredToBuy(self, tickets: list[int], k: int) -> int:
        target = tickets[k]
        time = 0
        for i, count in enumerate(tickets):
            if i <= k:
                time += min(count, target)
            else:
                time += min(count, target - 1)
        return time
