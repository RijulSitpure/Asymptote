import sys

class Solution:
    def solveEquation(self, equation: str) -> str:
        def parse(side: str):
            coeff = 0
            const = 0
            i = 0
            n = len(side)
            sign = 1
            while i < n:
                if side[i] == "+":
                    sign = 1
                    i += 1
                elif side[i] == "-":
                    sign = -1
                    i += 1
                j = i
                while j < n and (side[j].isdigit() or side[j] == "x"):
                    j += 1
                token = side[i:j]
                i = j
                if not token:
                    continue
                if token.endswith("x"):
                    val = token[:-1]
                    c = 1 if val == "" else int(val)
                    coeff += sign * c
                else:
                    const += sign * int(token)
            return coeff, const

        left, right = equation.split("=")
        c1, k1 = parse(left)
        c2, k2 = parse(right)
        coeff = c1 - c2
        const = k2 - k1
        if coeff == 0:
            return "Infinite solutions" if const == 0 else "No solution"
        return f"x={const // coeff}"

def test():
    sol = Solution()
    assert sol.solveEquation("x+5-3+x=6+x-2") == "x=2", "test 1 failed"
    assert sol.solveEquation("x=x") == "Infinite solutions", "test 2 failed"
    assert sol.solveEquation("2x=x") == "x=0", "test 3 failed"
    print("✓ solve-the-equation passed")

if __name__ == "__main__":
    test()
