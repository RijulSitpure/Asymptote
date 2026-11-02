from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def checkStrings(self, s1: str, s2: str) -> bool:
        return sorted(s1[0::2]) == sorted(s2[0::2]) and sorted(s1[1::2]) == sorted(s2[1::2])
