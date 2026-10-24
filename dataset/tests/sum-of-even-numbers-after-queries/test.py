from typing import List

class Solution:
    def sumEvenAfterQueries(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        even_sum = sum(x for x in nums if x % 2 == 0)
        res = []
        for val, idx in queries:
            if nums[idx] % 2 == 0:
                even_sum -= nums[idx]
            nums[idx] += val
            if nums[idx] % 2 == 0:
                even_sum += nums[idx]
            res.append(even_sum)
        return res

def test():
    sol = Solution()
    n1 = [1,2,3,4]
    q1 = [[1,0],[-3,1],[-4,0],[2,3]]
    assert sol.sumEvenAfterQueries(n1, q1) == [8,6,2,4], "test 1 failed"
    n2 = [1]
    q2 = [[4,0]]
    assert sol.sumEvenAfterQueries(n2, q2) == [0], "test 2 failed"
    print("✓ sum-of-even-numbers-after-queries passed")

if __name__ == "__main__":
    test()
