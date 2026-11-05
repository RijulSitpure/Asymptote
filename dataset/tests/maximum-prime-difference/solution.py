class Solution:
    def maximumPrimeDifference(self, nums: list[int]) -> int:
        primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97}
        first = -1
        last = -1
        for i, x in enumerate(nums):
            if x in primes:
                if first == -1:
                    first = i
                last = i
        return last - first
