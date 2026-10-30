from typing import List, Optional, Tuple, Dict, Set

import math

class Solution:
    def replaceNonCoprimes(self, nums: list[int]) -> list[int]:
        stack = []
        for x in nums:
            while stack:
                g = math.gcd(stack[-1], x)
                if g > 1:
                    x = (stack.pop() * x) // g
                else:
                    break
            stack.append(x)
        return stack
