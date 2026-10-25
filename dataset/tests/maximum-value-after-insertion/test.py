class Solution:
    def maxValue(self, n: str, x: int) -> str:
        s_x = str(x)
        if n[0] != '-':
            for i in range(len(n)):
                if int(n[i]) < x:
                    return n[:i] + s_x + n[i:]
            return n + s_x
        else:
            for i in range(1, len(n)):
                if int(n[i]) > x:
                    return n[:i] + s_x + n[i:]
            return n + s_x

def test():
    sol = Solution()
    assert sol.maxValue("99", 9) == "999"
    assert sol.maxValue("-13", 2) == "-123"
    assert sol.maxValue("73", 6) == "763"

if __name__ == '__main__':
    test()
