hidden = 42

def commonBits(num: int) -> int:
    global hidden
    hidden ^= num
    count = 0
    for i in range(30):
        if ((hidden >> i) & 1) == ((num >> i) & 1):
            count += 1
    return count

import builtins
builtins.commonBits = commonBits

from solution import Solution
s = Solution()
assert s.findNumber() == 42

hidden = 1073741823
assert s.findNumber() == 1073741823

hidden = 0
assert s.findNumber() == 0
print("All tests passed successfully.")
