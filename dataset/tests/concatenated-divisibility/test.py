class Solution:
    def concatenatedDivisibility(self, nums: list[int], k: int) -> list[int]:
        n = len(nums)
        nums.sort()
        len_nums = [len(str(x)) for x in nums]
        pow10 = [pow(10, l, k) for l in len_nums]

        memo = {}
        def dfs(mask, rem):
            if mask == (1 << n) - 1:
                return rem == 0
            state = (mask, rem)
            if state in memo:
                return memo[state]
            for i in range(n):
                if not (mask & (1 << i)):
                    n_rem = (rem * pow10[i] + nums[i]) % k
                    if dfs(mask | (1 << i), n_rem):
                        memo[state] = True
                        return True
            memo[state] = False
            return False

        if not dfs(0, 0):
            return []

        res = []
        mask = 0
        rem = 0
        for _ in range(n):
            for i in range(n):
                if not (mask & (1 << i)):
                    n_rem = (rem * pow10[i] + nums[i]) % k
                    if dfs(mask | (1 << i), n_rem):
                        res.append(nums[i])
                        mask |= (1 << i)
                        rem = n_rem
                        break
        return res

def run_tests():
    s = Solution()
    assert s.concatenatedDivisibility([12, 3], 3) == [3, 12]
    print("All tests passed for concatenated-divisibility")

if __name__ == '__main__':
    run_tests()
