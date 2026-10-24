from typing import List

class Solution:
    def bagOfTokensScore(self, tokens: List[int], power: int) -> int:
        tokens.sort()
        left, right = 0, len(tokens) - 1
        score = 0
        max_score = 0
        while left <= right:
            if power >= tokens[left]:
                power -= tokens[left]
                score += 1
                max_score = max(max_score, score)
                left += 1
            elif score > 0 and left < right:
                power += tokens[right]
                score -= 1
                right -= 1
            else:
                break
        return max_score

def test():
    sol = Solution()
    assert sol.bagOfTokensScore([100], 50) == 0, "test 1 failed"
    assert sol.bagOfTokensScore([200, 100], 150) == 1, "test 2 failed"
    assert sol.bagOfTokensScore([100, 200, 300, 400], 200) == 2, "test 3 failed"
    print("✓ bag-of-tokens passed")

if __name__ == "__main__":
    test()
