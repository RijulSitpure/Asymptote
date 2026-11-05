class Solution:
    def resultArray(self, nums: list[int], k: int, queries: list[list[int]]) -> list[int]:
        nums = [x % k for x in nums]
        n = len(nums)
        ans = []
        for q in queries:
            idx, val, start, x = q[0], q[1] % k, q[2], q[3]
            nums[idx] = val
            prod = 1
            cnt = 0
            for i in range(start, n):
                prod = (prod * nums[i]) % k
                if prod == x:
                    cnt += 1
            ans.append(cnt)
        return ans

def run_tests():
    s = Solution()
    assert s.resultArray([1, 2, 3], 2, [[1, 4, 0, 0]]) == [2]
    print("All tests passed for find-x-value-of-array-ii")

if __name__ == '__main__':
    run_tests()
