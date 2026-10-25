class Solution:
    def maxScore(self, cardPoints: list[int], k: int) -> int:
        n = len(cardPoints)
        window_size = n - k
        cur_sum = sum(cardPoints[:window_size])
        min_sum = cur_sum
        for i in range(window_size, n):
            cur_sum += cardPoints[i] - cardPoints[i - window_size]
            min_sum = min(min_sum, cur_sum)
        return sum(cardPoints) - min_sum

def test():
    sol = Solution()
    assert sol.maxScore([1,2,3,4,5,6,1], 3) == 12, "test 1 failed"
    assert sol.maxScore([2,2,2], 2) == 4, "test 2 failed"
    assert sol.maxScore([9,7,7,9,7,7,9], 7) == 55, "test 3 failed"
    print("✓ maximum-points-you-can-obtain-from-cards passed")

if __name__ == "__main__":
    test()
