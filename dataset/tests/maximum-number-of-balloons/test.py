from collections import Counter

class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        c = Counter(text)
        return min(
            c['b'],
            c['a'],
            c['l'] // 2,
            c['o'] // 2,
            c['n']
        )

def test():
    sol = Solution()
    assert sol.maxNumberOfBalloons("nlaebolko") == 1, "test 1 failed"
    assert sol.maxNumberOfBalloons("loonbalxballpoon") == 2, "test 2 failed"
    assert sol.maxNumberOfBalloons("leetcode") == 0, "test 3 failed"
    print("✓ maximum-number-of-balloons passed")

if __name__ == "__main__":
    test()
