class Solution:
    def maximumHappinessSum(self, happiness: list[int], k: int) -> int:
        happiness.sort(reverse=True)
        ans = 0
        for i in range(k):
            gain = happiness[i] - i
            if gain <= 0:
                break
            ans += gain
        return ans
