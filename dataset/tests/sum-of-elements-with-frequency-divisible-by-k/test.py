from collections import Counter

class Solution:
    def sumOfElementsWithFrequencyDivisibleByK(self, nums: list[int], k: int) -> int:
        freq = Counter(nums)
        total = 0
        for x, count in freq.items():
            if count % k == 0:
                total += x * count
        return total

def run_tests():
    sol = Solution()
    assert sol.sumOfElementsWithFrequencyDivisibleByK([1, 2, 2, 3, 3, 3], 2) == 4 # 2 appears 2 times (2%2==0) -> 2*2 = 4
    assert sol.sumOfElementsWithFrequencyDivisibleByK([1, 1, 1, 1], 2) == 4 # 1 appears 4 times (4%2==0) -> 1*4 = 4
    assert sol.sumOfElementsWithFrequencyDivisibleByK([5, 5, 5], 2) == 0 # 3 is not divisible by 2
    print("All tests passed for 3712.")

if __name__ == "__main__":
    run_tests()