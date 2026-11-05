class Solution:
    def resultArray(self, nums: list[int], k: int) -> list[int]:
        ans = [0] * k
        dp = [0] * k
        for num in nums:
            new_dp = [0] * k
            num_mod = num % k
            new_dp[num_mod] += 1
            for i in range(k):
                if dp[i]:
                    new_mod = (i * num_mod) % k
                    new_dp[new_mod] += dp[i]
            for i in range(k):
                ans[i] += new_dp[i]
            dp = new_dp
        return ans

def run_tests():
    s = Solution()
    assert s.resultArray([1, 2, 3], 2) == [4, 2]
    assert s.resultArray([2, 4], 3) == [0, 1, 2]
    print("All tests passed for find-x-value-of-array-i")

if __name__ == '__main__':
    run_tests()
