class Solution:
    def strWithout3a3b(self, a: int, b: int) -> str:
        res = []
        while a > 0 or b > 0:
            if len(res) >= 2 and res[-1] == res[-2] == "a":
                res.append("b")
                b -= 1
            elif len(res) >= 2 and res[-1] == res[-2] == "b":
                res.append("a")
                a -= 1
            elif a >= b:
                res.append("a")
                a -= 1
            else:
                res.append("b")
                b -= 1
        return "".join(res)

def verify(s, a, b):
    return "aaa" not in s and "bbb" not in s and s.count("a") == a and s.count("b") == b

def test():
    sol = Solution()
    s1 = sol.strWithout3a3b(1, 2)
    assert verify(s1, 1, 2), "test 1 failed"
    s2 = sol.strWithout3a3b(4, 1)
    assert verify(s2, 4, 1), "test 2 failed"
    print("✓ string-without-aaa-or-bbb passed")

if __name__ == "__main__":
    test()
