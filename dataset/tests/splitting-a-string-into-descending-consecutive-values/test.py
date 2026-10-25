class Solution:
    def splitString(self, s: str) -> bool:
        def check(idx: int, prev: int) -> bool:
            if idx == len(s):
                return True
            for j in range(idx + 1, len(s) + 1):
                val = int(s[idx:j])
                if val == prev - 1 and check(j, val):
                    return True
                if val >= prev:
                    break
            return False

        for i in range(1, len(s)):
            first_val = int(s[:i])
            if check(i, first_val):
                return True
        return False

def test():
    sol = Solution()
    assert sol.splitString("1234") is False
    assert sol.splitString("050043") is True
    assert sol.splitString("9080701") is False

if __name__ == '__main__':
    test()
