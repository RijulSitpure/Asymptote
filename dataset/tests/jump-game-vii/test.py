class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        if s[-1] != '0':
            return False

        n = len(s)
        dp = [False] * n
        dp[0] = True
        reach_count = 0

        for i in range(1, n):
            if i >= minJump and dp[i - minJump]:
                reach_count += 1
            if i > maxJump and dp[i - maxJump - 1]:
                reach_count -= 1

            if reach_count > 0 and s[i] == '0':
                dp[i] = True

        return dp[-1]

def test():
    sol = Solution()
    assert sol.canReach("011010", 2, 3) is True
    assert sol.canReach("01101110", 2, 3) is False

if __name__ == '__main__':
    test()
