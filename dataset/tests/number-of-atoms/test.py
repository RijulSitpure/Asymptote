import collections

class Solution:
    def countOfAtoms(self, formula: str) -> str:
        stack = [collections.Counter()]
        i = 0
        n = len(formula)

        while i < n:
            if formula[i] == "(":
                stack.append(collections.Counter())
                i += 1
            elif formula[i] == ")":
                top = stack.pop()
                i += 1
                start = i
                while i < n and formula[i].isdigit():
                    i += 1
                mult = int(formula[start:i]) if i > start else 1
                for elem, count in top.items():
                    stack[-1][elem] += count * mult
            else:
                start = i
                i += 1
                while i < n and formula[i].islower():
                    i += 1
                elem = formula[start:i]
                start = i
                while i < n and formula[i].isdigit():
                    i += 1
                count = int(formula[start:i]) if i > start else 1
                stack[-1][elem] += count

        final_counts = stack[0]
        res = []
        for elem in sorted(final_counts.keys()):
            res.append(elem)
            if final_counts[elem] > 1:
                res.append(str(final_counts[elem]))
        return "".join(res)

def test():
    sol = Solution()
    assert sol.countOfAtoms("H2O") == "H2O", "test 1 failed"
    assert sol.countOfAtoms("Mg(OH)2") == "H2MgO2", "test 2 failed"
    assert sol.countOfAtoms("K4(ON(SO3)2)2") == "K4N2O14S4", "test 3 failed"
    print("✓ number-of-atoms passed")

if __name__ == "__main__":
    test()
