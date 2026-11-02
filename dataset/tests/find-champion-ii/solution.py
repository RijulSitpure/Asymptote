from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def findChampion(self, n: int, edges: List[List[int]]) -> int:
        in_degree = [0] * n
        for u, v in edges:
            in_degree[v] += 1
        zero_in = [i for i in range(n) if in_degree[i] == 0]
        return zero_in[0] if len(zero_in) == 1 else -1
