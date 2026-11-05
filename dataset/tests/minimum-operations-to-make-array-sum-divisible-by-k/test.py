class Solution:
    def minOperations(self, nums: list[int], k: int) -> int:
        return sum(nums) % k

def run_tests():
    s = Solution()
    assert s.minOperations([3, 1, 4], 5) == 3
    assert s.minOperations([5, 10, 15], 5) == 0
    print("All tests passed for minimum-operations-to-make-array-sum-divisible-by-k")

if __name__ == '__main__':
    run_tests()
