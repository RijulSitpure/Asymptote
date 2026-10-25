class Solution:
    def maxScore(self, s: str) -> int:
        total_ones = s.count("1")
        zeros_left = 0
        ones_left = 0
        max_score = 0
        for i in range(len(s) - 1):
            if s[i] == "0":
                zeros_left += 1
            else:
                ones_left += 1
            score = zeros_left + (total_ones - ones_left)
            max_score = max(max_score, score)
        return max_score

def test():
    sol = Solution()
    assert sol.maxScore("011101") == 5, "test 1 failed"
    assert sol.maxScore("00111") == 5, "test 2 failed"
    assert sol.maxScore("1111") == 3, "test 3 failed"
    print("✓ maximum-score-after-splitting-a-string passed")

if __name__ == "__main__":
    test()
