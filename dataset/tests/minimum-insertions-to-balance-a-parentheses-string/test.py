class Solution:
    def minInsertions(self, s: str) -> int:
        insertions = 0
        open_cnt = 0
        i = 0
        n = len(s)
        while i < n:
            if s[i] == "(":
                open_cnt += 1
                i += 1
            else:
                if i + 1 < n and s[i + 1] == ")":
                    i += 2
                else:
                    insertions += 1
                    i += 1
                if open_cnt > 0:
                    open_cnt -= 1
                else:
                    insertions += 1
        return insertions + open_cnt * 2

def test():
    sol = Solution()
    assert sol.minInsertions("(()))") == 1, "test 1 failed"
    assert sol.minInsertions(")") == 2, "test 2 failed"
    assert sol.minInsertions("))())(") == 3, "test 3 failed"
    print("✓ minimum-insertions-to-balance-a-parentheses-string passed")

if __name__ == "__main__":
    test()
