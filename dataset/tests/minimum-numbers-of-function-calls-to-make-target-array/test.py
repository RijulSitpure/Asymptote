class Solution:
    def minOperations(self, nums: list[int]) -> int:
        total_ones = 0
        max_bits = 0
        for x in nums:
            total_ones += bin(x).count("1")
            if x > 0:
                max_bits = max(max_bits, x.bit_length() - 1)
        return total_ones + max_bits

def test():
    sol = Solution()
    assert sol.minOperations([1,5]) == 5, "test 1 failed"
    assert sol.minOperations([2,2]) == 3, "test 2 failed"
    assert sol.minOperations([4,2,5]) == 6, "test 3 failed"
    print("✓ minimum-numbers-of-function-calls-to-make-target-array passed")

if __name__ == "__main__":
    test()
