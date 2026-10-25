class Solution:
    def getLengthOfOptimalCompression(self, s: str, k: int) -> int:
        n = len(s)
        memo = {}
        def dp(i, rem):
            if rem < 0:
                return float("inf")
            if i >= n or n - i <= rem:
                return 0
            state = (i, rem)
            if state in memo:
                return memo[state]
            res = dp(i + 1, rem - 1)
            diff = 0
            same = 0
            for j in range(i, n):
                if s[j] == s[i]:
                    same += 1
                else:
                    diff += 1
                if diff > rem:
                    break
                length = 1 + (0 if same == 1 else (1 if same < 10 else (2 if same < 100 else 3)))
                res = min(res, length + dp(j + 1, rem - diff))
            memo[state] = res
            return res
        return dp(0, k)

def test():
    sol = Solution()
    assert sol.getLengthOfOptimalCompression("aaabcccd", 2) == 4, "test 1 failed"
    assert sol.getLengthOfOptimalCompression("aabbaa", 2) == 2, "test 2 failed"
    assert sol.getLengthOfOptimalCompression("aaaaaaaaaaa", 0) == 3, "test 3 failed"
    print("✓ string-compression-ii passed")

if __name__ == "__main__":
    test()
