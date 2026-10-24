class Solution:
    def braceExpansionII(self, expression: str) -> list[str]:
        groups = [[]]
        level = 0
        start = 0
        for i, c in enumerate(expression):
            if c == '{':
                if level == 0:
                    start = i + 1
                level += 1
            elif c == '}':
                level -= 1
                if level == 0:
                    sub = self.braceExpansionII(expression[start:i])
                    groups[-1].append(sub)
            elif level == 0:
                if c == ',':
                    groups.append([])
                else:
                    groups[-1].append([c])
        
        res = set()
        for group in groups:
            combos = [""]
            for word_set in group:
                combos = [prefix + w for prefix in combos for w in word_set]
            res.update(combos)
        return sorted(list(res))

def test():
    sol = Solution()
    res1 = sol.braceExpansionII("{a,b}{c,{d,e}}")
    assert res1 == ["ac","ad","ae","bc","bd","be"], f"test 1 failed: {res1}"
    res2 = sol.braceExpansionII("{{a,z},a{b,c},{ab,z}}")
    assert res2 == ["a","ab","ac","z"], f"test 2 failed: {res2}"
    print("✓ brace-expansion-ii passed")

if __name__ == "__main__":
    test()
