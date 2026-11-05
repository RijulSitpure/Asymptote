class Solution:
    def convertDateToBinary(self, date: str) -> str:
        parts = date.split('-')
        bin_parts = [bin(int(p))[2:] for p in parts]
        return "-".join(bin_parts)
