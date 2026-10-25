class Solution:
    def evaluate(self, s: str, knowledge: list[list[str]]) -> str:
        d = {k: v for k, v in knowledge}
        res = []
        i, n = 0, len(s)
        while i < n:
            if s[i] == '(':
                j = s.index(')', i)
                key = s[i + 1:j]
                res.append(d.get(key, '?'))
                i = j + 1
            else:
                res.append(s[i])
                i += 1
        return ''.join(res)

def test():
    sol = Solution()
    assert sol.evaluate("(name)is(age)yearsold", [["name","bob"],["age","two"]]) == "bobistwoyearsold"
    assert sol.evaluate("hi(name)", [["a","b"]]) == "hi?"
    assert sol.evaluate("(a)(a)(a)aaa", [["a","yes"]]) == "yesyesyesaaa"

if __name__ == '__main__':
    test()
