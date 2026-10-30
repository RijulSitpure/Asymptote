class Solution:
    def kItemsWithMaximumSum(self, numOnes: int, numZeros: int, numNegOnes: int, k: int) -> int:
        take_ones = min(k, numOnes)
        k -= take_ones
        take_zeros = min(k, numZeros)
        k -= take_zeros
        take_negs = k
        return take_ones - take_negs
