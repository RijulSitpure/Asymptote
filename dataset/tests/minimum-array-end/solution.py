class Solution:
    def minEnd(self, n: int, x: int) -> int:
        val = n - 1
        ans = x
        bit_pos = 0
        val_pos = 0
        while (1 << val_pos) <= val:
            while (ans >> bit_pos) & 1:
                bit_pos += 1
            if (val >> val_pos) & 1:
                ans |= (1 << bit_pos)
            bit_pos += 1
            val_pos += 1
        return ans
