class Solution:
    def kthCharacter(self, k: int) -> str:
        # Each doubling operation shifts by 1 if bit is set in 0-indexed k - 1
        shifts = bin(k - 1).count('1')
        return chr(ord('a') + (shifts % 26))
