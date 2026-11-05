class Solution:
    def getResults(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        arr = list(nums)
        ans = []
        for q in queries:
            if q[0] == 1:
                arr[q[1]] = q[2]
            elif q[0] == 2:
                res = 0
                for v in arr[q[1]:q[2] + 1]:
                    res ^= v
                ans.append(res)
            elif q[0] == 3:
                arr[q[1]:q[2] + 1] = reversed(arr[q[1]:q[2] + 1])
        return ans

def run_tests():
    s = Solution()
    assert s.getResults([1, 2, 3], [[2, 0, 2], [3, 0, 2], [2, 0, 2]]) == [0, 0]
    print("All tests passed for range-xor-queries-with-subarray-reversals")

if __name__ == '__main__':
    run_tests()
