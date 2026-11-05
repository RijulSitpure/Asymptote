target_num = 31

def commonSetBits(num: int) -> int:
    return bin(target_num & num).count('1')

import builtins
builtins.commonSetBits = commonSetBits

from solution import Solution

s = Solution()
assert s.findNumber() == 31

target_num = 1024
assert s.findNumber() == 1024

target_num = 536870911
assert s.findNumber() == 536870911
print("guess-the-number-using-bitwise-questions-i tests passed!")
