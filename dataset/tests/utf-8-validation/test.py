from typing import List

class Solution:
    def validUtf8(self, data: List[int]) -> bool:
        remaining = 0
        for byte in data:
            byte &= 0xFF
            if remaining == 0:
                if (byte >> 7) == 0:
                    remaining = 0
                elif (byte >> 5) == 0b110:
                    remaining = 1
                elif (byte >> 4) == 0b1110:
                    remaining = 2
                elif (byte >> 3) == 0b11110:
                    remaining = 3
                else:
                    return False
            else:
                if (byte >> 6) != 0b10:
                    return False
                remaining -= 1
        return remaining == 0

def test():
    sol = Solution()
    assert sol.validUtf8([197,130,1]) == True, "test 1 failed"
    assert sol.validUtf8([235,140,4]) == False, "test 2 failed"
    print("✓ utf-8-validation passed")

if __name__ == "__main__":
    test()
