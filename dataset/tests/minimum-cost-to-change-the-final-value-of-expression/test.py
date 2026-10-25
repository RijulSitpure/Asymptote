class Solution:
    def minOperationsToFlip(self, expression: str) -> int:
        def evaluate(op: str, v1: int, c1: int, v2: int, c2: int):
            if op == '&':
                v = v1 & v2
                if v1 == 1 and v2 == 1:
                    cost = min(c1, c2)
                elif v1 == 0 and v2 == 0:
                    cost = 1 + min(c1, c2)
                else:
                    cost = 1
                return v, cost
            else:
                v = v1 | v2
                if v1 == 0 and v2 == 0:
                    cost = min(c1, c2)
                elif v1 == 1 and v2 == 1:
                    cost = 1 + min(c1, c2)
                else:
                    cost = 1
                return v, cost

        val_stk = []
        op_stk = []

        def apply_op():
            op = op_stk.pop()
            v2, c2 = val_stk.pop()
            v1, c1 = val_stk.pop()
            val_stk.append(evaluate(op, v1, c1, v2, c2))

        for ch in expression:
            if ch in '01':
                val_stk.append((int(ch), 1))
                if op_stk and op_stk[-1] != '(':
                    apply_op()
            elif ch in '&|':
                op_stk.append(ch)
            elif ch == '(':
                op_stk.append('(')
            elif ch == ')':
                op_stk.pop()
                if op_stk and op_stk[-1] != '(':
                    apply_op()

        return val_stk[0][1]

def test():
    sol = Solution()
    assert sol.minOperationsToFlip("1&(0|1)") == 1
    assert sol.minOperationsToFlip("(0&0)&(0&0&0)") == 3
    assert sol.minOperationsToFlip("(0|(1|0&1))") == 1

if __name__ == '__main__':
    test()
