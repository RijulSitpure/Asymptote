class Solution:
    def minOperations(self, n: int) -> int:
        return (n ^ (3 * n)).bit_count()
