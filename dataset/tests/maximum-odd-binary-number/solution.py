from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def maximumOddBinaryNumber(self, s: str) -> str:
        ones = s.count('1')
        zeros = len(s) - ones
        return '1' * (ones - 1) + '0' * zeros + '1'
