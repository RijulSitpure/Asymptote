class Solution:
    def shortestWay(self, source: str, target: str) -> int:
        source_chars = set(source)
        for c in target:
            if c not in source_chars:
                return -1

        res = 0
        j = 0
        n = len(target)
        m = len(source)
        while j < n:
            i = 0
            while i < m and j < n:
                if source[i] == target[j]:
                    j += 1
                i += 1
            res += 1
        return res

def test():
    sol = Solution()
    assert sol.shortestWay("abc", "abcbc") == 2, "test 1 failed"
    assert sol.shortestWay("abc", "d") == -1, "test 2 failed"
    assert sol.shortestWay("xyz", "xzyxz") == 3, "test 3 failed"
    print("✓ shortest-way-to-form-string passed")

if __name__ == "__main__":
    test()
