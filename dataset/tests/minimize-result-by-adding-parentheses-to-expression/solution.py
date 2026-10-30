from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def minimizeResult(self, expression: str) -> str:
        L, R = expression.split("+")
        min_val = float("inf")
        best_expr = ""
        for i in range(len(L)):
            m1 = int(L[:i]) if i > 0 else 1
            a = int(L[i:])
            for j in range(1, len(R) + 1):
                b = int(R[:j])
                m2 = int(R[j:]) if j < len(R) else 1
                val = m1 * (a + b) * m2
                if val < min_val:
                    min_val = val
                    best_expr = f"{L[:i]}({L[i:]}+{R[:j]}){R[j:]}"
        return best_expr
